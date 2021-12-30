import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @Get('/:username/:role')
  setAdminRole(@Param('username') username: string, @Param('role') role: string) {
    return this.usersService.setRole(username, role);
  }

  @ApiOperation({ summary: 'get users list' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
