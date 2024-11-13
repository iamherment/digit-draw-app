import { Bet } from '../bet/bet.entity';
export declare class Gameround {
    id: number;
    bets: Bet[];
    winningNumber: string;
    status: string;
    roundStartTime: Date;
    roundEndTime: Date;
    totalPot: number;
}
