import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAdapter } from '../utils/jwt/jwt-adapter';
import { AuthInputDTO } from './dtos/create-auth.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { UsersService } from '../users/users.service';
import { BcryptAdapter } from '../utils/bcrypt/bcrypt-adapter';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAdapter: JwtAdapter,
    private readonly usersService: UsersService,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}
  public async login(data: AuthInputDTO): Promise<AuthResponse> {
    const userFound = await this.usersService.findUserByEmail(data.email);

    const isValidUser = await this.bcryptAdapter.comparer(
      data.password,
      userFound.password,
    );

    if (!isValidUser) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const jwtPayload = {
      _id: userFound._id,
      name: userFound.name,
      active: userFound.active,
    };

    const { accessToken } = await this.jwtAdapter.sign(jwtPayload);

    return { accessToken };
  }
}
