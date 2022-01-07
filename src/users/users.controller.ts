import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Messages } from 'src/@core/strings';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ChangeRoleDTO } from 'src/user-roles/dto/change-role.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users interaction')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDTO) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'set role' })
  @ApiResponse({ status: 200, type: User })
  @Put('/:username')
  setRole(
    @Param('username') username: string,
    @Body() changeRoleDTO: ChangeRoleDTO,
  ) {
    return this.usersService.setRole(username, changeRoleDTO);
  }

  @ApiOperation({ summary: 'get users list' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Roles(1)
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'delete user' })
  @ApiResponse({ status: 200, type: [User] })
  @Delete('/:username')
  deleteUser(@Param('username') username: string) {
    return this.usersService.deleteUser(username);
  }
}
