import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  createUser(dto: CreateUserDTO): Promise<User> {
    return this.userRepository.create(dto);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
