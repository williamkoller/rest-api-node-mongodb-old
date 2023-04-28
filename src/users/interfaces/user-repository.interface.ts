import { UserResponse } from './user-response.interface';
import { AddUserDTO } from '../dtos/add-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';

export interface IUserRepository {
  add(data: AddUserDTO): Promise<UserResponse>;
  find(): Promise<UserResponse[]>;
  findById(id: string): Promise<UserResponse>;
  findByEmail(email: string): Promise<UserResponse>;
  update(id: string, updateUser: UpdateUserDTO): Promise<UserResponse>;
  remove(id: string): Promise<void>;
}
