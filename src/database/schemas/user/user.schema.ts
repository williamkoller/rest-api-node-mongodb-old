import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema({
  timestamps: true,
  collection: 'users',
  _id: true,
})
export class User {
  @Prop({
    type: String,
    default: () => randomUUID(),
  })
  _id!: string;

  @Prop({ type: String, required: true, default: null })
  name: string;

  @Prop({ type: String, required: true, default: null, unique: true })
  email: string;

  @Prop({ type: String, required: true, default: null })
  password: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop([{ type: String, enum: UserType }])
  type: UserType[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
