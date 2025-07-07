import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FeatureFlagOptions } from './feature-flag-options.interface';
import { FEATURE_FLAG_KEY } from './feature-flag.decorator';
import { FeatureFlagService } from './feature-flag.service';

/**
 * Este Guard es la clase que valida si se da acceso a la peticion de la feature
 */
@Injectable()
export class FeatureFlagGuard implements CanActivate {
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

    // Se validan las opciones
    return this.servicioFeatureFlag.featureHabilitada(opcionesFeature, { entorno: ent, usuario: user});
  }
}
