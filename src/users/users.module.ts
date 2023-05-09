import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BcryptAdapter } from '../utils/bcrypt/bcrypt-adapter';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, BcryptAdapter],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
