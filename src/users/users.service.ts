import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { ChangeRoleDTO } from 'src/user-roles/dto/change-role.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService) { }

  async createUser(dto: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue("USER");
    user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async setRole(username: string, changeRoleDTO: ChangeRoleDTO): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    const role = await this.rolesService.getRoleByValue(changeRoleDTO.role);
    user.$set('roles', role.id);
    return user;
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email }, include: { all: true } });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll({ include: { all: true } });
  }

  deleteUser(username: string) {
    return this.userRepository.destroy({where: {username}})
  }
}
