import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../database/repositories/users/users.repository';
import { UserResponse } from './interfaces/user-response.interface';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { BcryptAdapter } from '../utils/bcrypt/bcrypt-adapter';
import { UsersMapper } from './mappers/users.mapper';
import { AddUserDTO } from './dtos/add-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  public async addUser(data: AddUserDTO): Promise<UserResponse> {
    const dataWithBcryptPassword = {
      ...data,
      password: await this.bcryptAdapter.hash(data.password),
    };

    const userExists = await this.usersRepo.findByEmail(data.email);

    if (userExists) {
      throw new ConflictException();
    }

    const user = await this.usersRepo.add(dataWithBcryptPassword);

    return UsersMapper.toUser(user);
  }

  public async findUsers(): Promise<UserResponse[]> {
    const users = await this.usersRepo.find();

    if (!users.length) {
      throw new NotFoundException('No record found');
    }

    return UsersMapper.toUsers(users);
  }

  public async findUserById(id: string): Promise<UserResponse> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundException(`User id: ${id} not found.`);
    }

    return UsersMapper.toUser(user);
  }

  public async findUserByEmail(email: string): Promise<UserResponse> {
    const userFound = await this.usersRepo.findByEmail(email);

    if (!userFound) {
      throw new NotFoundException(`User email: ${email} not found.`);
    }

    return userFound;
  }

  public async updateUser(
    id: string,
    updateUser: UpdateUserDTO,
  ): Promise<UserResponse> {
    const userFound = await this.findUserById(id);
    let updateUserBcryptPassword = {
      ...updateUser,
    };

    if (updateUser.password) {
      updateUserBcryptPassword = {
        password: await this.bcryptAdapter.hash(updateUser.password),
      };
    }

    return await this.usersRepo.update(userFound._id, updateUserBcryptPassword);
  }

  public async removeUser(id: string): Promise<void> {
    const userFound = await this.findUserById(id);
    await this.usersRepo.remove(userFound._id);
  }

  public async findUserLoggedById(id: string): Promise<UserResponse> {
    return await this.findUserById(id);
  }
}
