import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';

export const schemas = [
  MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
  ]),
];
