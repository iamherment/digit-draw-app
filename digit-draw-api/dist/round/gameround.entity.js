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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gameround = void 0;
const typeorm_1 = require("typeorm");
const bet_entity_1 = require("../bet/bet.entity");
let Gameround = class Gameround {
};
exports.Gameround = Gameround;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Gameround.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bet_entity_1.Bet, bet => bet.round),
    __metadata("design:type", Array)
], Gameround.prototype, "bets", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Gameround.prototype, "winningNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Gameround.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Gameround.prototype, "roundStartTime", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], Gameround.prototype, "roundEndTime", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { default: 0 }),
    __metadata("design:type", Number)
], Gameround.prototype, "totalPot", void 0);
exports.Gameround = Gameround = __decorate([
    (0, typeorm_1.Entity)()
], Gameround);
//# sourceMappingURL=gameround.entity.js.map