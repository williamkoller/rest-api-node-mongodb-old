import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from './interfaces/user-repository.interface';
import { UserResponse } from './interfaces/user-response.interface';
import { UserInterface } from './interfaces/user.interface';
import { User } from './schemas/user.schema';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { propertyFalse } from '../utils/mongodb/property-false';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userCollection: Model<UserInterface>,
  ) {}
  public async add(data: any): Promise<any> {
    const user = new this.userCollection(data, propertyFalse);
    return await user.save();
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
      { ...updateUser },
      { new: true },
    );
  }

  public async remove(id: string): Promise<void> {
    await this.userCollection.deleteOne({ _id: { $eq: id } });
  }
}
