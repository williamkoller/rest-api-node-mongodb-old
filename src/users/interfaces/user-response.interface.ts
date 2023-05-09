import { UserType } from 'src/database/schemas/user/user.schema';

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  type: UserType;
  createdAt?: Date;
  updatedAt?: Date;
}
