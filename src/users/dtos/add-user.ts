import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

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
}
