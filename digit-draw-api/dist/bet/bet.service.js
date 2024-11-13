"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bet_entity_1 = require("./bet.entity");
const round_entity_1 = require("../round/round.entity");
const user_entity_1 = require("../users/user.entity");
let BetService = class BetService {
    constructor(betRepository, roundRepository, userRepository) {
        this.betRepository = betRepository;
        this.roundRepository = roundRepository;
        this.userRepository = userRepository;
    }
    async placeBet(roundId, betNumber, amount, userId) {
        const round = await this.roundRepository.findOne({ where: { id: roundId } });
        if (!round)
            throw new Error('Round not found');
        const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
        if (!user)
            throw new Error('User not found');
        const bet = this.betRepository.create({ round, betNumber, amount, user });
        await this.betRepository.save(bet);
        round.totalPot = Number(round.totalPot) + Number(amount);
        await this.roundRepository.save(round);
        return bet;
    }
    async getUserBetsAndWinnings(userId) {
        const user = await this.userRepository.findOne({ where: { id: Number(userId) }, relations: ['bets', 'bets.round'] });
        if (!user)
            throw new Error('User not found');
        const userBets = user.bets;
        const totalPot = userBets.reduce((sum, bet) => sum + Number(bet.round.totalPot), 0);
        const totalWinningAmount = userBets.reduce((sum, bet) => {
            if (bet.betNumber === bet.round.winningNumber) {
                return sum + Number(bet.amount);
            }
            return sum;
        }, 0);
        const userBetDetails = userBets.map(bet => {
            const won = bet.betNumber === bet.round.winningNumber;
            const payout = won ? (Number(bet.amount) / totalWinningAmount) * Number(bet.round.totalPot) : 0;
            return {
                roundId: bet.round.id,
                betNumber: bet.betNumber,
                amount: Number(bet.amount),
                won,
                payout: Math.round(payout * 100) / 100,
            };
        });
        const userTotalContribution = userBets.reduce((sum, bet) => sum + Number(bet.amount), 0);
        const contributionPercentage = (userTotalContribution / totalPot) * 100;
        return {
            userBets: userBetDetails,
            totalWinnings: userBetDetails.reduce((sum, bet) => sum + bet.payout, 0),
            contributionPercentage: Math.round(contributionPercentage * 100) / 100,
        };
    }
};
exports.BetService = BetService;
exports.BetService = BetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bet_entity_1.Bet)),
    __param(1, (0, typeorm_1.InjectRepository)(round_entity_1.Round)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BetService);
//# sourceMappingURL=bet.service.js.map