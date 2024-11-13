import { Round } from './round.entity';
export declare class Bet {
    id: number;
    round: Round;
    number: string;
    amount: number;
    userId: string;
}
