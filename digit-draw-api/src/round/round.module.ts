import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { Round } from './round.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from 'src/result/result.entity';
import { RoundController } from './round.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Round,Result])
  ],
  providers: [RoundService],
  controllers: [RoundController]
})
export class RoundModule {}
