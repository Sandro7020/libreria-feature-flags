import { FeatureFlagOptions } from './feature-flag-options.interface';
export declare class FeatureFlagService {
    featureHabilitada(opciones: FeatureFlagOptions, contexto: {
        entorno: string;
        usuario?: string;
    }): boolean;
}
