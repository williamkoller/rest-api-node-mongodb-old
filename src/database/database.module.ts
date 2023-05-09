import { Module } from '@nestjs/common';
import { schemas } from './schemas';
import { UsersRepository } from './repositories/users/users.repository';

@Module({
  imports: [...schemas],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class DatabaseModule {}
