import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Round } from './round.entity';
import { Result } from 'src/result/result.entity';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
) {}

    async initRound() : Promise<Round> {
        const round = this.roundRepository.create({
            status: 'active',
            roundStartTime: new Date(),
            winningNumber: null
        })

        await this.roundRepository.save(round);
        return round;
    }

    async updateRoundNumber(roundId: number, winningNumber: number): Promise<Round> {
        const round = await this.roundRepository.findOne({ where: { id: roundId } });
        if (!round) throw new Error('Round not found');
    
        round.winningNumber = winningNumber;
        await this.roundRepository.save(round);
        return round;
    }

    async endRound(roundId: number): Promise<Result> {
        const round = await this.roundRepository.findOne({ where: { id: roundId }, relations: ['bets','bets.user'] });
        if (!round) throw new Error('Round not found');
    
        const payouts: Record<string, number> = {};
    
        // Calculate proportional payouts
        const totalPot = round.totalPot;
        const winningBets = round.bets.filter(bet => bet.betNumber === round.winningNumber);
        const totalWinningAmount = winningBets.reduce((sum, bet) => sum + bet.amount, 0);
    
        if (totalWinningAmount > 0) {
          winningBets.forEach(bet => {
              const payout = (Number(bet.amount) / totalWinningAmount) * totalPot;
              payouts[bet.user.username] = Math.round(payout * 100) / 100; // Round to 2 decimal places
          });
      }
    
        // Save result
        const result = this.resultRepository.create({
          roundId: round.id,
          winningNumber: round.winningNumber,
          totalPot,
          payouts,
        });
        await this.resultRepository.save(result);
    
        // Update round end time
        round.roundEndTime = new Date();
        round.status = 'ended';
        await this.roundRepository.save(round);
    
        return result;
    }

    private generateRandomNumber(): number {
        const min = 1000; // Minimum 4-digit number
        const max = 9999; // Maximum 4-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async getRoundsByStatus(status: string): Promise<Round[]> {
      return this.roundRepository.find({ where: { status} });
    }
}
