import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BettingController } from './bet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { Round } from 'src/round/round.entity';
import { User } from 'src/users/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Bet, Round,User])
  ],
  providers: [BetService],
  controllers: [BettingController]
})
export class BetModule {}
