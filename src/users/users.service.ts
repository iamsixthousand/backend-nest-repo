import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Exceptions, Messages } from 'src/@core/strings';
import { RolesService } from 'src/roles/roles.service';
import { ChangeRoleDTO } from 'src/users/dto/change-role.dto';
import { banUserDTO } from './dto/ban-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService
    ) {}

    async createUser(userDto: CreateUserDTO): Promise<User> {
        try {
            const user = await this.userRepository.create(userDto);
            const role = await this.rolesService.getRoleById(1);
            user.$set('role', role.id);
            return user;
        } catch (error) {
            throw new HttpException(
                { message: Exceptions.userExists },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async setRole(changeRoleDTO: ChangeRoleDTO): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username: changeRoleDTO.username } });
        if (user) {
            const role = await this.rolesService.getRoleById(changeRoleDTO.roleId);
            if (role) {
                user.$set('role', role.id);
                return user;
            }
            throw new HttpException(Exceptions.noRole, HttpStatus.BAD_REQUEST);
        }
        throw new HttpException(Exceptions.noUser, HttpStatus.BAD_REQUEST);
    }

    async banUser(banDto: banUserDTO) {
        const user = await this.userRepository.findOne({ where: { username: banDto.username } });
        if (user) {
            user.banned = true;
            user.banReason = banDto.banReason;
            user.save();
            return `${user.username} ${Messages.banned} ${user.banReason}`
        }
        throw new HttpException(Exceptions.noUser, HttpStatus.NOT_FOUND);
    }

    getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
    }

    getUserByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({
            where: { username },
            include: { all: true },
        });
    }

    getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll({ include: { all: true } });
    }

    async deleteUser(username: string) {
        if (username) {
            const rows = await this.userRepository.destroy({
                where: { username },
            });
            return {
                message: `${username} ` + Messages.userDeleted,
                rows: rows,
            };
        }
        return {
            message: Exceptions.noUser,
        };
    }
}
