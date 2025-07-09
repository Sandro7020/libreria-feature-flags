// src/services/feature-flag.service.spec.ts
import { FeatureFlagService } from '../feature-flag/feature-flag.service';
import { FeatureFlagOptions } from '../feature-flag/feature-flag-options.interface';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;

  beforeEach(() => {
    service = new FeatureFlagService();
  });

  it('permite acceso si no hay restricciones definidas', () => {
    const options: FeatureFlagOptions = {};
    const context = { entorno: 'dev', usuario: 'admin' };

    expect(service.featureHabilitada(options, context)).toBe(true);
  });

  it('permite acceso si el entorno está permitido', () => {
    const options: FeatureFlagOptions = { entornos: ['dev', 'test'] };
    const context = { entorno: 'dev', usuario: 'anyone' };

    expect(service.featureHabilitada(options, context)).toBe(true);
  });

  it('deniega acceso si el entorno no está permitido', () => {
    const options: FeatureFlagOptions = { entornos: ['prod'] };
    const context = { entorno: 'dev', usuario: 'anyone' };

    expect(service.featureHabilitada(options, context)).toBe(false);
  });

  it('permite acceso si el usuario está permitido', () => {
    const options: FeatureFlagOptions = { usuariosPermitidos: ['admin'] };
    const context = { entorno: 'dev', usuario: 'admin' };

    expect(service.featureHabilitada(options, context)).toBe(true);
  });

  it('deniega acceso si el usuario no está permitido', () => {
    const options: FeatureFlagOptions = { usuariosPermitidos: ['admin'] };
    const context = { entorno: 'dev', usuario: 'guest' };

    expect(service.featureHabilitada(options, context)).toBe(false);
  });

  it('permite acceso si se cumplen ambas condiciones', () => {
    const options: FeatureFlagOptions = {
      entornos: ['dev'],
      usuariosPermitidos: ['admin'],
    };
    const context = { entorno: 'dev', usuario: 'admin' };

    expect(service.featureHabilitada(options, context)).toBe(true);
  });

  it('deniega acceso si solo se cumple una condición', () => {
    const options: FeatureFlagOptions = {
      entornos: ['dev'],
      usuariosPermitidos: ['admin'],
    };
    const context = { entorno: 'prod', usuario: 'admin' };

    expect(service.featureHabilitada(options, context)).toBe(false);
  });

  it('deniega acceso si no hay usuario y se requiere uno', () => {
    const options: FeatureFlagOptions = {
      usuariosPermitidos: ['admin'],
    };
    const context = { entorno: 'dev' };

    expect(service.featureHabilitada(options, context)).toBe(false);
  });
});
