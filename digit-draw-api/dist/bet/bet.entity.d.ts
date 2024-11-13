import { Round } from '../round/round.entity';
import { User } from '../users/user.entity';
export declare class Bet {
    id: number;
    round: Round;
    user: User;
    betNumber: number;
    amount: number;
}
