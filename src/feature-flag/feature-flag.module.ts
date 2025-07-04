import { Module } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';

@Module({
  providers: [FeatureFlagService]
})
export class FeatureFlagModule {}
