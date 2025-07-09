import type { FeatureFlagOptions, FeatureFlagContext } from "./feature-flag-options.interface";
export declare class FeatureFlagService {
    private readonly logger;
    featureHabilitada(options: FeatureFlagOptions, context: FeatureFlagContext): boolean;
}
