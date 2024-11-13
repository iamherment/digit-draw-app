"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetModule = void 0;
const common_1 = require("@nestjs/common");
const bet_service_1 = require("./bet.service");
const bet_controller_1 = require("./bet.controller");
const typeorm_1 = require("@nestjs/typeorm");
const bet_entity_1 = require("./bet.entity");
const round_entity_1 = require("../round/round.entity");
const user_entity_1 = require("../users/user.entity");
let BetModule = class BetModule {
};
exports.BetModule = BetModule;
exports.BetModule = BetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([bet_entity_1.Bet, round_entity_1.Round, user_entity_1.User])
        ],
        providers: [bet_service_1.BetService],
        controllers: [bet_controller_1.BettingController]
    })
], BetModule);
//# sourceMappingURL=bet.module.js.map