import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { Exceptions, Messages } from 'src/@core/strings';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDTO) {
    const user = await this.userValidation(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDTO) {
    const checkEmail = await this.userService.getUserByEmail(userDto.email);
    if (checkEmail) {
      throw new HttpException(Exceptions.emailInUse, HttpStatus.BAD_REQUEST);
    } else {
      const checkUsername = await this.userService.getUserByUsername(
        userDto.username,
      );
      if (checkUsername) {
        throw new HttpException(
          Exceptions.usernameInUse,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({
          ...userDto,
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

  private async userValidation(userDto: CreateUserDTO) {
    let user: User;
    if (userDto.email) {
      user = await this.userService.getUserByEmail(userDto.email);
      if (user) {
        const passwordsEqual = this.bcryptValidation(
          userDto.password,
          user.password,
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
    user = await this.userService.getUserByUsername(userDto.username);
    const passwordsEqual = this.bcryptValidation(
      userDto.password,
      user.password,
    );
    if (passwordsEqual) {
      return user;
    }
    throw new UnauthorizedException({
      message: Exceptions.invUsernameOrPassword,
    });
  }
}
