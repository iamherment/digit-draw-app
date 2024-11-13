"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModule = void 0;
const common_1 = require("@nestjs/common");
const result_service_1 = require("./result.service");
const result_controller_1 = require("./result.controller");
const typeorm_1 = require("@nestjs/typeorm");
const result_entity_1 = require("./result.entity");
const bet_entity_1 = require("../bet/bet.entity");
let ResultModule = class ResultModule {
};
exports.ResultModule = ResultModule;
exports.ResultModule = ResultModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([result_entity_1.Result, bet_entity_1.Bet])
        ],
        providers: [result_service_1.ResultService],
        controllers: [result_controller_1.ResultController]
    })
], ResultModule);
//# sourceMappingURL=result.module.js.map