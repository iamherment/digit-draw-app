"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundModule = void 0;
const common_1 = require("@nestjs/common");
const round_service_1 = require("./round.service");
const round_entity_1 = require("./round.entity");
const typeorm_1 = require("@nestjs/typeorm");
const result_entity_1 = require("../result/result.entity");
const round_controller_1 = require("./round.controller");
let RoundModule = class RoundModule {
};
exports.RoundModule = RoundModule;
exports.RoundModule = RoundModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([round_entity_1.Round, result_entity_1.Result])
        ],
        providers: [round_service_1.RoundService],
        controllers: [round_controller_1.RoundController]
    })
], RoundModule);
//# sourceMappingURL=round.module.js.map