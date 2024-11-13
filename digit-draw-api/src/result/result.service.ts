import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.entity';
import { Bet } from '../bet/bet.entity';
import { ResultDto } from './result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
  ) {}

  async getResults(): Promise<ResultDto[]> {
    const results = await this.resultRepository.find();
    const resultDtos: ResultDto[] = [];

    for (const result of results) {
      const bets = await this.betRepository.find({ 
        where: { round: { id: result.roundId } },
        relations: ['user'], // Include the user relation
      });
      const userContributions: Record<string, number> = {};


      bets.forEach(bet => {
        const username = bet.user.username;
        if (!userContributions[username]) {
          userContributions[username] = 0;
        }
        userContributions[username] += Number(bet.amount);
      });

      resultDtos.push({
        roundId: result.roundId,
        totalPot: result.totalPot,
        winningNumber: result.winningNumber,
        payouts: result.payouts,
        userContributions,
      });
    }

    return resultDtos;
  }
}