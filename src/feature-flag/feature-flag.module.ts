import type { Provider } from "@nestjs/common"
import { Module, type DynamicModule } from "@nestjs/common"
import { FeatureFlagService } from "./feature-flag.service"
import { APP_GUARD } from "@nestjs/core"
import { FeatureFlagGuard } from "./feature-flag.guard"

export interface FeatureFlagModuleOptions {
  isGlobal?: boolean
  enableGlobalGuard?: boolean
}

@Module({})
export class FeatureFlagModule {
  static forRoot(options: FeatureFlagModuleOptions = {}): DynamicModule {
    const { isGlobal = false, enableGlobalGuard = true } = options

    const providers: Provider[] = [FeatureFlagService]

    if (enableGlobalGuard) {
      providers.push({
        provide: APP_GUARD,
        useClass: FeatureFlagGuard,
      })
    }

    return {
      module: FeatureFlagModule,
      global: isGlobal,
      providers,
      exports: [FeatureFlagService],
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: FeatureFlagModule,
      providers: [FeatureFlagService, FeatureFlagGuard],
      exports: [FeatureFlagService, FeatureFlagGuard],
    }
  }
}
