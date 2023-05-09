import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { AuthUser } from './types/auth-user.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(data: AuthUser) {
    this.logger.log(`JwtStrategy => ${JSON.stringify(data)}`);
    const user = await this.usersService.findUserById(data._id);

    this.logger.log(`user => ${JSON.stringify(user)}`);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
