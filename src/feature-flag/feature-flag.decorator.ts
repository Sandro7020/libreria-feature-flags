import { SetMetadata } from '@nestjs/common';

export const FeatureFlag = (...args: string[]) => SetMetadata('feature-flag', args);
