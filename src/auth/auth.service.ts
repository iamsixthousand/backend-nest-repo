import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { Exceptions } from 'src/@core/strings';
import { LoginDTO } from './dto/login.dto';
import { RegistrationDTO } from './dto/registration.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(loginDto: LoginDTO) {
        const user = await this.userValidation(loginDto);
        return this.generateToken(user);
    }

    async register(registerDto: RegistrationDTO) {
        const checkEmail = await this.userService.getUserByEmail(registerDto.email);
        if (checkEmail) {
            throw new HttpException(Exceptions.emailInUse, HttpStatus.BAD_REQUEST);
        } else {
            const checkUsername = await this.userService.getUserByUsername(
                registerDto.username
            );
            if (checkUsername) {
                throw new HttpException(Exceptions.usernameInUse, HttpStatus.BAD_REQUEST);
            } else {
                const hashPassword = await bcrypt.hash(registerDto.password, 5);
                const user = await this.userService.createUser({
                    ...registerDto,
                    password: hashPassword,
                });
                return this.generateToken(user);
            }
        }
    }

    private async generateToken(user: User) {
        const payload = {
            email: user.email,
            username: user.username,
            id: user.id,
            role: user.role,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private bcryptValidation(inputPW: string, existingPW: string) {
        return bcrypt.compare(inputPW, existingPW);
    }

    private async userValidation(loginDto: LoginDTO) {
        let user: User;
        if (loginDto.email) {
            user = await this.userService.getUserByEmail(loginDto.email);
            if (user) {
                const passwordsEqual = this.bcryptValidation(
                    loginDto.password,
                    user.password
                );
                if (passwordsEqual) {
                    return user;
                }
                throw new UnauthorizedException({
                    message: Exceptions.invEmailOrPassword,
                });
            }
            throw new UnauthorizedException({
                message: Exceptions.invEmailOrPassword,
            });
        }
        user = await this.userService.getUserByUsername(loginDto.username);
        const passwordsEqual = this.bcryptValidation(loginDto.password, user.password);
        if (passwordsEqual) {
            return user;
        }
        throw new UnauthorizedException({
            message: Exceptions.invUsernameOrPassword,
        });
    }
}
