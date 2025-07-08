import { Injectable } from '@nestjs/common';
import { FeatureFlagOptions } from './feature-flag-options.interface';

@Injectable()
export class FeatureFlagService {

    featureHabilitada(opciones: FeatureFlagOptions, contexto: { entorno: string, usuario?: string}): boolean {
        
        const { entornos, usuariosPermitidos } = opciones;
        const { entorno, usuario } = contexto;

        const entornoPermitido = !entornos || entornos.includes(entorno);
        
        let usuarioPermitido: boolean = !usuariosPermitidos;
        if (usuario && usuariosPermitidos) {
            usuarioPermitido = usuarioPermitido || usuariosPermitidos.includes(usuario);
        }
        
        return entornoPermitido && usuarioPermitido;
    }

}
