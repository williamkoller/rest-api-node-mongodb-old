import { IsEmail, IsOptional, IsString } from 'class-validator';

export class IdentifyUserDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
