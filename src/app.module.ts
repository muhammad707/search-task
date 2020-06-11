import { Module } from '@nestjs/common';
import * as path from "path";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
    }) ,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
