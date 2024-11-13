import { Repository } from 'typeorm';
import { Round } from './round.entity';
import { Result } from 'src/result/result.entity';
export declare class RoundService {
    private roundRepository;
    private resultRepository;
    constructor(roundRepository: Repository<Round>, resultRepository: Repository<Result>);
    initRound(): Promise<Round>;
    updateRoundNumber(roundId: number, winningNumber: number): Promise<Round>;
    endRound(roundId: number): Promise<Result>;
    private generateRandomNumber;
    getRoundsByStatus(status: string): Promise<Round[]>;
}
