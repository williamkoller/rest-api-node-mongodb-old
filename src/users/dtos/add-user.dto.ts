import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserType } from 'src/database/schemas/user/user.schema';

export class AddUserDTO {
  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString()
  @Length(2, 50)
  name: string;

  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString()
  @Length(8, 20)
  password: string;

  @IsOptional()
  @IsEnum(UserType, { each: true })
  type: UserType[];
}
