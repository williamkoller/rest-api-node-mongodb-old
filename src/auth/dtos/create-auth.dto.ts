import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDTO {
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString()
  password: string;
}
