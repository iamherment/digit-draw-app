import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roundId: number;

  @Column()
  winningNumber: number;

  @Column('decimal')
  totalPot: number;

  @Column('json')
  payouts: Record<string, number>; // Payouts for each user in this round
}
