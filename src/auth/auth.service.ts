import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async login(userDto: CreateUserDTO) {
        const user = await this.userValidation(userDto);
        return this.generateToken(user)
    }

    async register(userDto: CreateUserDTO) {
        const newUser = await this.userService.getUserByEmail(userDto.email);
        if (newUser) {
            throw new HttpException('This email is already in use', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, username: user.username, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload),
        }
    }

    private async userValidation(userDto: CreateUserDTO) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (user) {
            const passwordsEqual = await bcrypt.compare(userDto.password, user.password);
            if (passwordsEqual) {
                return user;
            }
            throw new UnauthorizedException({message: 'Invalid email or password'});
        }
        throw new UnauthorizedException({message: 'Invalid email or password'});       
    }

}
