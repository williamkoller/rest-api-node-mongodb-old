import { Document } from 'mongoose';
import { UserType } from 'src/database/schemas/user/user.schema';

export interface UserInterface extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly active: boolean;
  readonly type: UserType;
}
