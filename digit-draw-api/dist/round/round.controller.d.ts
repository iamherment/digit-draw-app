import { RoundService } from './round.service';
export declare class RoundController {
    private readonly roundService;
    constructor(roundService: RoundService);
    initRound(): Promise<import("./round.entity").Round>;
    updateRoundNumber(roundId: number, winningNumber: number): Promise<import("./round.entity").Round>;
    endRound(roundId: number): Promise<import("../result/result.entity").Result>;
    getRoundsByStatus(status: string): Promise<import("./round.entity").Round[]>;
}
