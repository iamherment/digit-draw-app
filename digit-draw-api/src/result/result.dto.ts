
export class ResultDto {
    roundId: number;
    totalPot: number;
    winningNumber: number;
    payouts: Record<string, number>;
    userContributions: Record<string, number>;
  }