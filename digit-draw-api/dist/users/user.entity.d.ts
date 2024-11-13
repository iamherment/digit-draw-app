import { Bet } from 'src/bet/bet.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
    bets: Bet[];
}
