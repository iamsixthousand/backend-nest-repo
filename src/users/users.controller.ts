import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Res,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RequiredRoles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ChangeRoleDTO } from 'src/users/dto/change-role.dto';
import { banUserDTO } from './dto/ban-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

type DeleteFunc =
    | { message: string; rows: number }
    | { message: string; rows?: undefined };

@ApiTags('Users interaction')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    // *********************************CREATE USER************************************ \\
    @ApiOperation({ summary: 'user creation' })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDTO): Promise<User> {
        return this.usersService.createUser(userDto);
    }

    // *********************************SET USER ROLE************************************ \\
    @ApiOperation({ summary: 'set role' })
    @ApiResponse({ status: 200, type: User })
    @RequiredRoles(1)
    @UseGuards(RolesGuard)
    @Put()
    setRole(@Body() changeRoleDTO: ChangeRoleDTO): Promise<User> {
        return this.usersService.setRole(changeRoleDTO);
    }

    // *********************************BAN USER************************************ \\
    @ApiOperation({ summary: 'ban user' })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
    @RequiredRoles(1)
    @UseGuards(RolesGuard)
    @Patch()
    banUser(@Body() banDto: banUserDTO): Promise<string> {
        return this.usersService.banUser(banDto);
    }

    // *********************************GET USERS LIST************************************ \\
    @ApiOperation({ summary: 'get users list' })
    @ApiResponse({ status: 200, type: [User] })
    @RequiredRoles(1) // required role is ADMIN with roleId = 1
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers(@Res({ passthrough: true }) response: Response ): Promise<User[]> {
        response.cookie('first', 'cookie');
        return this.usersService.getAllUsers();
    }

    // *********************************DELETE USER************************************ \\
    @ApiOperation({ summary: 'delete user' })
    @ApiResponse({ status: 200, type: [User] })
    @RequiredRoles(1)
    @UseGuards(RolesGuard)
    @Delete('/:username')
    deleteUser(@Param('username') username: string): Promise<DeleteFunc> {
        return this.usersService.deleteUser(username);
    }
}
