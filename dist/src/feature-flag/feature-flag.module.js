"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagModule = void 0;
const common_1 = require("@nestjs/common");
const feature_flag_service_1 = require("./feature-flag.service");
const core_1 = require("@nestjs/core");
const feature_flag_guard_1 = require("./feature-flag.guard");
let FeatureFlagModule = class FeatureFlagModule {
};
exports.FeatureFlagModule = FeatureFlagModule;
exports.FeatureFlagModule = FeatureFlagModule = __decorate([
    (0, common_1.Module)({
        providers: [
            feature_flag_service_1.FeatureFlagService,
            core_1.Reflector,
            {
                provide: core_1.APP_GUARD,
                useClass: feature_flag_guard_1.FeatureFlagGuard,
            },
        ],
        exports: [feature_flag_service_1.FeatureFlagService]
    })
], FeatureFlagModule);
//# sourceMappingURL=feature-flag.module.js.map