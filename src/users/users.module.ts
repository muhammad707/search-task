import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { UserAddressRepository } from './repositories/address.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, UserAddressRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
