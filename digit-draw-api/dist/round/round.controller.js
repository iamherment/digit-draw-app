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
exports.RoundController = void 0;
const common_1 = require("@nestjs/common");
const round_service_1 = require("./round.service");
const passport_1 = require("@nestjs/passport");
let RoundController = class RoundController {
    constructor(roundService) {
        this.roundService = roundService;
    }
    async initRound() {
        return this.roundService.initRound();
    }
    async updateRoundNumber(roundId, winningNumber) {
        return this.roundService.updateRoundNumber(roundId, winningNumber);
    }
    async endRound(roundId) {
        return this.roundService.endRound(roundId);
    }
    async getRoundsByStatus(status) {
        return this.roundService.getRoundsByStatus(status);
    }
};
exports.RoundController = RoundController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('initRound'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoundController.prototype, "initRound", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Put)('updateRoundNumber/:roundId'),
    __param(0, (0, common_1.Param)('roundId')),
    __param(1, (0, common_1.Body)('winningNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RoundController.prototype, "updateRoundNumber", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('endRound/:roundId'),
    __param(0, (0, common_1.Param)('roundId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoundController.prototype, "endRound", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('getRounds'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoundController.prototype, "getRoundsByStatus", null);
exports.RoundController = RoundController = __decorate([
    (0, common_1.Controller)('round'),
    __metadata("design:paramtypes", [round_service_1.RoundService])
], RoundController);
//# sourceMappingURL=round.controller.js.map