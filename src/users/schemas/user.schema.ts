import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({
  timestamps: true,
  collection: 'users',
  _id: false,
})
export class User {
  @Prop({
    type: String,
    default: () => randomUUID(),
  })
  _id!: string;

  @Prop({ type: String, required: true, default: null })
  name: string;

  @Prop({ type: String, required: true, default: null })
  email: string;

  @Prop({ type: String, required: true, default: null })
  password: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: Date, text: 'created_at' })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);