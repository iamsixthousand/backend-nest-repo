import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredRoles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles interaction')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'role creation' })
    @ApiResponse({ status: 200, type: Role })
    @Post()
    create(@Body() roleDto: CreateRoleDTO): Promise<Role> {
        return this.rolesService.createRole(roleDto);
    }

    @ApiOperation({ summary: 'get role' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:id')
    getRoleById(@Param('id') id: number): Promise<Role> {
        return this.rolesService.getRoleById(id);
    }

    @ApiOperation({ summary: 'get all roles' })
    @ApiResponse({ status: 200, type: [Role] })
    @RequiredRoles(1)
    @UseGuards(RolesGuard)
    @Get()
    getAllRoles(): Promise<Role[]> {
        return this.rolesService.getAllRoles();
    }
}
