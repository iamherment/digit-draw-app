import { Bet } from '../bet/bet.entity';
export declare class Round {
    id: number;
    bets: Bet[];
    winningNumber: number;
    status: string;
    roundStartTime: Date;
    roundEndTime: Date;
    totalPot: number;
}
