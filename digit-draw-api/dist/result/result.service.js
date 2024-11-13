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
exports.ResultService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const result_entity_1 = require("./result.entity");
const bet_entity_1 = require("../bet/bet.entity");
let ResultService = class ResultService {
    constructor(resultRepository, betRepository) {
        this.resultRepository = resultRepository;
        this.betRepository = betRepository;
    }
    async getResults() {
        const results = await this.resultRepository.find();
        const resultDtos = [];
        for (const result of results) {
            const bets = await this.betRepository.find({
                where: { round: { id: result.roundId } },
                relations: ['user'],
            });
            const userContributions = {};
            bets.forEach(bet => {
                const username = bet.user.username;
                if (!userContributions[username]) {
                    userContributions[username] = 0;
                }
                userContributions[username] += Number(bet.amount);
            });
            resultDtos.push({
                roundId: result.roundId,
                totalPot: result.totalPot,
                winningNumber: result.winningNumber,
                payouts: result.payouts,
                userContributions,
            });
        }
        return resultDtos;
    }
};
exports.ResultService = ResultService;
exports.ResultService = ResultService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(result_entity_1.Result)),
    __param(1, (0, typeorm_1.InjectRepository)(bet_entity_1.Bet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ResultService);
//# sourceMappingURL=result.service.js.map