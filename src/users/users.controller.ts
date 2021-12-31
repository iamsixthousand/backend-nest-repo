import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangeRoleDTO } from 'src/user-roles/dto/change-role.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users interaction')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDTO) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'set role' })
  @ApiResponse({ status: 200, type: User })
  @Put('/:username')
  setRole(@Param('username') username: string, @Body() changeRoleDTO: ChangeRoleDTO) {
    return this.usersService.setRole(username, changeRoleDTO);
  }

  @ApiOperation({ summary: 'get users list' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'delete user' })
  @ApiResponse({ status: 200, type: [User] })
  @Delete('/:username')
  deleteUser(@Param('username') username: string) {
    this.usersService.deleteUser(username);
    return {
      message: `user ${username} has been deleted`,
    }
  }
}
