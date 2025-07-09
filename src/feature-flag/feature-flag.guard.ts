import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FeatureFlagOptions, FeatureFlagContext } from './feature-flag-options.interface';
import { FEATURE_FLAG_KEY } from './feature-flag.decorator';
import { FeatureFlagService } from './feature-flag.service';

/**
 * Este Guard es la clase que valida si se da acceso a la peticion de la feature
 */
@Injectable()
export class FeatureFlagGuard implements CanActivate {
  private readonly logger = new Logger(FeatureFlagGuard.name)
  
  constructor(
    private reflector: Reflector,
    private servicioFeatureFlag: FeatureFlagService
  ) {}
  
  /**
   * El método que hay que implementar para permitir o no la petición
   * @param context Es el contexto de ejecucion del decorador, en este caso se utiliza para acceder a la petición HTTP
   * @returns true si se permite el acceso - false si no es el caso
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const opcionesFeature = this.reflector.get<FeatureFlagOptions>(FEATURE_FLAG_KEY, context.getHandler());
    
    // No hay restricciones
    if (!opcionesFeature) { return true; }
    
    const peticion = context.switchToHttp().getRequest();
    const user = peticion.user?.username || peticion.headers['x-user'];
    const ent = process.env.NODE_ENV || 'dev';

    const flagContext: FeatureFlagContext = {
      entorno: ent,
      usuario: user,
    }

    // Se validan las opciones
    const habilitado = this.servicioFeatureFlag.featureHabilitada(opcionesFeature, flagContext);

    if (!habilitado) {
      this.logger.warn(`Feature flag bloqueado para: ${user}, entorno: ${ent}`);
    }

    return habilitado;
  }
}
