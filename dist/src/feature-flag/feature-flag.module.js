"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FeatureFlagModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagModule = void 0;
const common_1 = require("@nestjs/common");
const feature_flag_service_1 = require("./feature-flag.service");
const core_1 = require("@nestjs/core");
const feature_flag_guard_1 = require("./feature-flag.guard");
let FeatureFlagModule = FeatureFlagModule_1 = class FeatureFlagModule {
    static forRoot(options = {}) {
        const { isGlobal = false, enableGlobalGuard = true } = options;
        const providers = [feature_flag_service_1.FeatureFlagService];
        if (enableGlobalGuard) {
            providers.push({
                provide: core_1.APP_GUARD,
                useClass: feature_flag_guard_1.FeatureFlagGuard,
            });
        }
        return {
            module: FeatureFlagModule_1,
            global: isGlobal,
            providers,
            exports: [feature_flag_service_1.FeatureFlagService],
        };
    }
    static forFeature() {
        return {
            module: FeatureFlagModule_1,
            providers: [feature_flag_service_1.FeatureFlagService, feature_flag_guard_1.FeatureFlagGuard],
            exports: [feature_flag_service_1.FeatureFlagService, feature_flag_guard_1.FeatureFlagGuard],
        };
    }
};
exports.FeatureFlagModule = FeatureFlagModule;
exports.FeatureFlagModule = FeatureFlagModule = FeatureFlagModule_1 = __decorate([
    (0, common_1.Module)({})
], FeatureFlagModule);
//# sourceMappingURL=feature-flag.module.js.map