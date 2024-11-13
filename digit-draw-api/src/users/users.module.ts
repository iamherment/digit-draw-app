import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Bet } from 'src/bet/bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Bet])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
