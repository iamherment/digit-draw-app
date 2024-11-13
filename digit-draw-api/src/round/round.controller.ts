import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RoundService } from './round.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('round')
export class RoundController {
    constructor(private readonly roundService: RoundService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('initRound')
    async initRound(){
        return this.roundService.initRound();   
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('updateRoundNumber/:roundId')
    async updateRoundNumber(
        @Param('roundId') roundId: number,
        @Body('winningNumber') winningNumber: number
    ) {
        return this.roundService.updateRoundNumber(roundId, winningNumber);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('endRound/:roundId')
    async endRound(
    @Param('roundId') roundId: number,
  ) {
    return this.roundService.endRound(roundId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getRounds')
    async getRoundsByStatus(@Query('status') status: string) {
        return this.roundService.getRoundsByStatus(status);
    }
}
