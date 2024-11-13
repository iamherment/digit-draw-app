import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { Round } from '../round/round.entity';
import { User } from '../users/user.entity';
export declare class BetService {
    private betRepository;
    private roundRepository;
    private userRepository;
    constructor(betRepository: Repository<Bet>, roundRepository: Repository<Round>, userRepository: Repository<User>);
    placeBet(roundId: number, betNumber: number, amount: number, userId: string): Promise<Bet>;
    getUserBetsAndWinnings(userId: string): Promise<any>;
}
