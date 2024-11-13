import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Round } from '../round/round.entity';
import { User } from '../users/user.entity'; // Adjust the import path as necessary

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Round, round => round.bets)
  round: Round;

  @ManyToOne(() => User, user => user.bets)
  user: User;

  @Column()
  betNumber: number;

  @Column('decimal')
  amount: number;
}