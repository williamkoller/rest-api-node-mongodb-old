import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserResponse } from './interfaces/user-response.interface';
import { Response } from 'src/utils/interfaces/response.interface';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { IdentifyUserDTO } from './dtos/identify-user.dto';
import { BcryptAdapter } from '../utils/bcrypt/bcrypt-adapter';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  public async addUser(data: any): Promise<Response<UserResponse>> {
    const dataWithBcryptPassword = {
      ...data,
      password: await this.bcryptAdapter.hash(data.password),
    };
    const user = await this.usersRepo.add(dataWithBcryptPassword);
    return {
      message: 'User created with successfully',
      data: user,
    };
  }

  public async findUsers(): Promise<Response<UserResponse[]>> {
    const users = await this.usersRepo.find();
    const usersMap = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    return {
      message: 'Fetched users with successfully',
      data: usersMap,
    };
  }

  public async findUserById(
    identifyUser: IdentifyUserDTO,
  ): Promise<Response<UserResponse>> {
    const user = await this.usersRepo.findById(identifyUser.id);

    if (!user) {
      throw new NotFoundException(`User id: ${identifyUser.id} not found.`);
    }

    return {
      message: 'Fetched user with successfully',
      data: user,
    };
  }

  public async findUserByEmail(email: string): Promise<UserResponse> {
    const userFound = await this.usersRepo.findByEmail(email);

    if (!userFound) {
      throw new NotFoundException(`User email: ${email} not found.`);
    }

    return userFound;
  }

  public async updateUser(
    identifyUser: IdentifyUserDTO,
    updateUser: UpdateUserDTO,
  ): Promise<UserResponse> {
    const useFound = await this.findUserById(identifyUser);
    const updateUserBcryptPassword = {
      ...updateUser,
      password: await this.bcryptAdapter.hash(updateUser.password),
    };
    return await this.usersRepo.update(
      useFound.data._id,
      updateUserBcryptPassword,
    );
  }

  public async removeUser(
    identifyUser: IdentifyUserDTO,
  ): Promise<Response<UserResponse>> {
    const userFound = await this.findUserById(identifyUser);
    await this.usersRepo.remove(userFound.data._id);
    return {
      message: 'User removed with successfully',
    };
  }
}
