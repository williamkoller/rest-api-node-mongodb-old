import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthJwtSign } from '../../auth/interfaces/auth-jwt-sign.interface';

@Injectable()
export class JwtAdapter {
  constructor(private readonly jwt: JwtService) {}

  public async sign(data: IAuthJwtSign) {
    return {
      accessToken: await this.jwt.signAsync(data),
    };
  }
}
