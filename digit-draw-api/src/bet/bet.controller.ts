import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BetService } from './bet.service';

@Controller('bet')
export class BettingController {
  constructor(private readonly bettingService: BetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async placeBet(
    @Body('roundId') roundId: number,
    @Body('betNumber') betNumber: number,
    @Body('amount') amount: number,
    @Body('userId') userId: string,
  ) {
    return this.bettingService.placeBet(roundId, betNumber, amount, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userBetsAndWinnings/:userId')
  async getUserBetsAndWinnings(
    @Param('userId') userId: string,
  ) {
    return this.bettingService.getUserBetsAndWinnings(userId);
  }

}
