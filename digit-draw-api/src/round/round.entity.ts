import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Bet } from '../bet/bet.entity';

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Bet, bet => bet.round)
  bets: Bet[];

  @Column({ nullable: true})
  winningNumber: number;

  @Column()
  status: string;

  @Column('timestamp')
  roundStartTime: Date;

  @Column('timestamp', { nullable: true })
  roundEndTime: Date;

  @Column('decimal', { default: 0 })
  totalPot: number; // Total amount bet in the round
}
