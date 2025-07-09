import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FeatureFlagService } from './feature-flag.service';
export declare class FeatureFlagGuard implements CanActivate {
    private reflector;
    private servicioFeatureFlag;
    private readonly logger;
    constructor(reflector: Reflector, servicioFeatureFlag: FeatureFlagService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
