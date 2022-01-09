import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Messages } from 'src/@core/strings';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegistrationDTO } from './dto/registration.dto';

type Success = { message: Messages.success };

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // *********************************LOGIN************************************ \\
    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
        @Body() loginDto: LoginDTO
    ): Promise<Success>{
        console.log(request.cookies) // cookies in console
        const userToken = (await this.authService.login(loginDto)).token
        response.cookie('logindata', userToken, { maxAge: 86400000, httpOnly: true });
        return { message: Messages.success }; 
    }

    // *********************************REGISTRATION************************************ \\
    @UsePipes(ValidationPipe)
    @Post('/register')
    async register(
        @Res({ passthrough: true }) response: Response,
        @Body() registerDto: RegistrationDTO
    ): Promise<Success> {
        const userToken = (await this.authService.register(registerDto)).token
        response.cookie('logindata', userToken, { maxAge: 86400000, httpOnly: true });
        return { message: Messages.success };  
    }
}
