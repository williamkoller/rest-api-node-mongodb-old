import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from 'src/database/schemas/user/user.schema';

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ each: true })
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString({ each: true })
  password?: string;

  @IsOptional()
  @IsEnum(UserType, { each: true })
  type?: UserType[];
}
