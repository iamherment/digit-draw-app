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
exports.BettingController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const bet_service_1 = require("./bet.service");
let BettingController = class BettingController {
    constructor(bettingService) {
        this.bettingService = bettingService;
    }
    async placeBet(roundId, betNumber, amount, userId) {
        return this.bettingService.placeBet(roundId, betNumber, amount, userId);
    }
    async getUserBetsAndWinnings(userId) {
        return this.bettingService.getUserBetsAndWinnings(userId);
    }
};
exports.BettingController = BettingController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('roundId')),
    __param(1, (0, common_1.Body)('betNumber')),
    __param(2, (0, common_1.Body)('amount')),
    __param(3, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], BettingController.prototype, "placeBet", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('userBetsAndWinnings/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BettingController.prototype, "getUserBetsAndWinnings", null);
exports.BettingController = BettingController = __decorate([
    (0, common_1.Controller)('bet'),
    __metadata("design:paramtypes", [bet_service_1.BetService])
], BettingController);
//# sourceMappingURL=bet.controller.js.map