export interface FeatureFlagOptions {
    entornos?: string[];
    usuariosPermitidos?: string[];
}
export interface FeatureFlagContext {
    entorno: string;
    usuario?: string;
}
