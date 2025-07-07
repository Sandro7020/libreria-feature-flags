import { SetMetadata } from '@nestjs/common';
import { FeatureFlagOptions } from './feature-flag-options.interface';

export const FEATURE_FLAG_KEY = 'feature-flag';

/**
 * 
 * @param options Las opciones para el feature al que se le va a aplicar una Feature Flag
 * @returns El decorador con la configuración puesta
 */
export const FeatureFlag = (options: FeatureFlagOptions): MethodDecorator => SetMetadata(FEATURE_FLAG_KEY, options);
