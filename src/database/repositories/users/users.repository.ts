import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../../users/interfaces/user-repository.interface';
import { UserResponse } from '../../../users/interfaces/user-response.interface';
import { UserInterface } from '../../interfaces/user/user.interface';
import { UpdateUserDTO } from '../../../users/dtos/update-user.dto';
import { propertyFalse } from '../../../utils/mongodb/property-false';
import { AddUserDTO } from '../../../users/dtos/add-user.dto';
import { User, UserType } from 'src/database/schemas/user/user.schema';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userCollection: Model<UserInterface>,
  ) {}

  public async add(data: AddUserDTO): Promise<UserResponse> {
    return (await this.userCollection.create({
      ...data,
      type: [data.type] ? [UserType.USER] : [data.type],
    })) as UserResponse;
  }

  public async find(): Promise<UserResponse[]> {
    return this.userCollection.find({}, propertyFalse);
  }

  public async findById(id: string): Promise<UserResponse> {
    return this.userCollection.findOne({ _id: { $eq: id } }, propertyFalse);
  }

  public async findByEmail(email: string): Promise<UserResponse> {
    return this.userCollection.findOne(
      { email: { $eq: email } },
      propertyFalse,
    );
  }

  public async update(
    id: string,
    updateUser: UpdateUserDTO,
  ): Promise<UserResponse> {
    return this.userCollection.findOneAndUpdate(
      {
        _id: { $eq: id },
      },
      { $eq: { ...updateUser } },
      { new: true },
    );
  }

  public async remove(id: string): Promise<void> {
    await this.userCollection.deleteOne({ _id: { $eq: id } });
  }
}
