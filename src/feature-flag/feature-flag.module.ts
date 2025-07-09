import { Module } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { FeatureFlagGuard } from './feature-flag.guard';

@Module({
  providers: [
    FeatureFlagService,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: FeatureFlagGuard,
    },
  ],
  exports: [FeatureFlagService, FeatureFlagGuard]
})
export class FeatureFlagModule {}
