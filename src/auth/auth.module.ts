import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtAdapter } from '../utils/jwt/jwt-adapter';
import { BcryptAdapter } from '../utils/bcrypt/bcrypt-adapter';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'Q1w2e3r4t5y6u7i8o9p0',
      signOptions: {
        expiresIn: '3h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAdapter, BcryptAdapter],
})
export class AuthModule {}
