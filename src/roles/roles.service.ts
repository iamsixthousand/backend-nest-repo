import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    createRole(dto: CreateRoleDTO): Promise<Role> {
        return this.roleRepository.create(dto);
    }

    getRoleById(id: number): Promise<Role> {
        return this.roleRepository.findOne({ where: { id } });
    }

    getAllRoles(): Promise<Role[]> {
        return this.roleRepository.findAll();
    }
}
