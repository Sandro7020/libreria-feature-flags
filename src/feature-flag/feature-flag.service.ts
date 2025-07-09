import { Injectable, Logger } from "@nestjs/common"
import type { FeatureFlagOptions, FeatureFlagContext } from "./feature-flag-options.interface"

@Injectable()
export class FeatureFlagService {
    private readonly logger = new Logger(FeatureFlagService.name)

    /**
     * Determina si una feature está habilitada basada en las opciones y contexto
     */
    featureHabilitada(options: FeatureFlagOptions, context: FeatureFlagContext): boolean {
        const { entornos, usuariosPermitidos } = options
        const { entorno, usuario } = context

        // Validar entorno
        const entornoPermitido = !entornos || entornos.includes(entorno)

        // Validar usuario
        let usuarioPermitido = !usuariosPermitidos // Si no hay restricciones de usuario, permitir
        if (usuario && usuariosPermitidos) {
            usuarioPermitido = usuariosPermitidos.includes(usuario)
        } else if (usuariosPermitidos && !usuario) {
            // Si hay restricciones de usuario pero no hay usuario, denegar
            usuarioPermitido = false
        }

        const result = entornoPermitido && usuarioPermitido

        this.logger.debug(`Eval. Feature Flag: entorno=${entorno}, usuario=${usuario}, resultado=${result}`)

        return result
    }
}
