"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FeatureFlagService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagService = void 0;
const common_1 = require("@nestjs/common");
let FeatureFlagService = FeatureFlagService_1 = class FeatureFlagService {
    logger = new common_1.Logger(FeatureFlagService_1.name);
    featureHabilitada(options, context) {
        const { entornos, usuariosPermitidos } = options;
        const { entorno, usuario } = context;
        const entornoPermitido = !entornos || entornos.includes(entorno);
        let usuarioPermitido = !usuariosPermitidos;
        if (usuario && usuariosPermitidos) {
            usuarioPermitido = usuariosPermitidos.includes(usuario);
        }
        else if (usuariosPermitidos && !usuario) {
            usuarioPermitido = false;
        }
        const result = entornoPermitido && usuarioPermitido;
        this.logger.debug(`Eval. Feature Flag: entorno=${entorno}, usuario=${usuario}, resultado=${result}`);
        return result;
    }
};
exports.FeatureFlagService = FeatureFlagService;
exports.FeatureFlagService = FeatureFlagService = FeatureFlagService_1 = __decorate([
    (0, common_1.Injectable)()
], FeatureFlagService);
//# sourceMappingURL=feature-flag.service.js.map