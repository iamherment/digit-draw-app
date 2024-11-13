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
exports.RoundService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const round_entity_1 = require("./round.entity");
const result_entity_1 = require("../result/result.entity");
let RoundService = class RoundService {
    constructor(roundRepository, resultRepository) {
        this.roundRepository = roundRepository;
        this.resultRepository = resultRepository;
    }
    async initRound() {
        const round = this.roundRepository.create({
            status: 'active',
            roundStartTime: new Date(),
            winningNumber: null
        });
        await this.roundRepository.save(round);
        return round;
    }
    async updateRoundNumber(roundId, winningNumber) {
        const round = await this.roundRepository.findOne({ where: { id: roundId } });
        if (!round)
            throw new Error('Round not found');
        round.winningNumber = winningNumber;
        await this.roundRepository.save(round);
        return round;
    }
    async endRound(roundId) {
        const round = await this.roundRepository.findOne({ where: { id: roundId }, relations: ['bets', 'bets.user'] });
        if (!round)
            throw new Error('Round not found');
        const payouts = {};
        const totalPot = round.totalPot;
        const winningBets = round.bets.filter(bet => bet.betNumber === round.winningNumber);
        const totalWinningAmount = winningBets.reduce((sum, bet) => sum + bet.amount, 0);
        if (totalWinningAmount > 0) {
            winningBets.forEach(bet => {
                const payout = (Number(bet.amount) / totalWinningAmount) * totalPot;
                payouts[bet.user.username] = Math.round(payout * 100) / 100;
            });
        }
        const result = this.resultRepository.create({
            roundId: round.id,
            winningNumber: round.winningNumber,
            totalPot,
            payouts,
        });
        await this.resultRepository.save(result);
        round.roundEndTime = new Date();
        round.status = 'ended';
        await this.roundRepository.save(round);
        return result;
    }
    generateRandomNumber() {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    async getRoundsByStatus(status) {
        return this.roundRepository.find({ where: { status } });
    }
};
exports.RoundService = RoundService;
exports.RoundService = RoundService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(round_entity_1.Round)),
    __param(1, (0, typeorm_1.InjectRepository)(result_entity_1.Result)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoundService);
//# sourceMappingURL=round.service.js.map