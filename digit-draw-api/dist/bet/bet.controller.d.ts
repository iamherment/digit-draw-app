import { BetService } from './bet.service';
export declare class BettingController {
    private readonly bettingService;
    constructor(bettingService: BetService);
    placeBet(roundId: number, betNumber: number, amount: number, userId: string): Promise<import("./bet.entity").Bet>;
    getUserBetsAndWinnings(userId: string): Promise<any>;
}
