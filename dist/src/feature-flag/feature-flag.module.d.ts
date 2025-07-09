import { type DynamicModule } from "@nestjs/common";
export interface FeatureFlagModuleOptions {
    isGlobal?: boolean;
    enableGlobalGuard?: boolean;
}
export declare class FeatureFlagModule {
    static forRoot(options?: FeatureFlagModuleOptions): DynamicModule;
    static forFeature(): DynamicModule;
}
