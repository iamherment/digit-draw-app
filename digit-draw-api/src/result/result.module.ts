import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './result.entity';
import { Bet } from 'src/bet/bet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result,Bet])
  ],
  providers: [ResultService],
  controllers: [ResultController]
})
export class ResultModule {}
