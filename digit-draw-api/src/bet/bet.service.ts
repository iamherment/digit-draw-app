import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { Round } from '../round/round.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async placeBet(roundId: number, betNumber: number, amount: number, userId: string): Promise<Bet> {
    const round = await this.roundRepository.findOne({ where: { id: roundId } });
    if (!round) throw new Error('Round not found');

    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) throw new Error('User not found');

    const bet = this.betRepository.create({ round, betNumber, amount, user });
    await this.betRepository.save(bet);
    round.totalPot = Number(round.totalPot) + Number(amount);
    await this.roundRepository.save(round);

    return bet;
  }

  async getUserBetsAndWinnings(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) }, relations: ['bets', 'bets.round'] });
    if (!user) throw new Error('User not found');

    const userBets = user.bets;
    const totalPot = userBets.reduce((sum, bet) => sum + Number(bet.round.totalPot), 0);
    const totalWinningAmount = userBets.reduce((sum, bet) => {
        if (bet.betNumber === bet.round.winningNumber) {
            return sum + Number(bet.amount);
        }
        return sum;
    }, 0);

    const userBetDetails = userBets.map(bet => {
        const won = bet.betNumber === bet.round.winningNumber;
        const payout = won ? (Number(bet.amount) / totalWinningAmount) * Number(bet.round.totalPot) : 0;
        return {
            roundId: bet.round.id,
            betNumber: bet.betNumber,
            amount: Number(bet.amount),
            won,
            payout: Math.round(payout * 100) / 100, // Round to 2 decimal places
        };
    });

    const userTotalContribution = userBets.reduce((sum, bet) => sum + Number(bet.amount), 0);
    const contributionPercentage = (userTotalContribution / totalPot) * 100;

    return {
        userBets: userBetDetails,
        totalWinnings: userBetDetails.reduce((sum, bet) => sum + bet.payout, 0),
        contributionPercentage: Math.round(contributionPercentage * 100) / 100, // Round to 2 decimal places
    };
}
}