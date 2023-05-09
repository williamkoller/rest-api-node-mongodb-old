import { UserResponse } from '../interfaces/user-response.interface';

export class UsersMapper {
  static toUser(user: UserResponse) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      active: user.active,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toUsers(users: UserResponse[]) {
    return users.map(this.toUser);
  }
}
