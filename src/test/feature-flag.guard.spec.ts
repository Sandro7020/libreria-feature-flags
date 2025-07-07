import { FeatureFlagGuard } from '../feature-flag/feature-flag.guard';
import { Reflector } from '@nestjs/core';
import { FeatureFlagService } from '../feature-flag/feature-flag.service';
import { ExecutionContext } from '@nestjs/common';
import { FeatureFlagOptions } from '../feature-flag/feature-flag-options.interface';

describe('FeatureFlagGuard', () => {
    let guard: FeatureFlagGuard;
    let reflector: Reflector;
    let featureFlagService: FeatureFlagService;

    beforeEach(() => {
        reflector = {
            get: jest.fn(),
        } as any;

        featureFlagService = {
            featureHabilitada: jest.fn(),
        } as any;

        guard = new FeatureFlagGuard(reflector, featureFlagService);
    });

    function mockExecutionContext(username?: string, entorno = 'dev'): ExecutionContext {
        return {
            switchToHttp: () => ({
                getRequest: () => ({
                    user: username ? { username } : undefined,
                }),
            }),
            getHandler: () => 'mockHandler',
        } as any;
    }

    it('permite acceso si no hay metadatos de feature flag', () => {
        (reflector.get as jest.Mock).mockReturnValue(undefined);

        const context = mockExecutionContext('admin');
        expect(guard.canActivate(context)).toBe(true);
    });

    it('permite acceso si el servicio indica que está habilitado', () => {
        process.env.NODE_ENV = 'dev';
        const options: FeatureFlagOptions = { entornos: ['test'], usuariosPermitidos: ['admin'] };
        (reflector.get as jest.Mock).mockReturnValue(options);
        (featureFlagService.featureHabilitada as jest.Mock).mockReturnValue(true);

        const context = mockExecutionContext('admin');
        expect(guard.canActivate(context)).toBe(true);
        expect(featureFlagService.featureHabilitada).toHaveBeenCalledWith(options, {
            entorno: 'dev',
            usuario: 'admin',
        });
    });

    it('deniega acceso si el servicio indica que está deshabilitado', () => {
        const options: FeatureFlagOptions = { usuariosPermitidos: ['admin'] };
        (reflector.get as jest.Mock).mockReturnValue(options);
        (featureFlagService.featureHabilitada as jest.Mock).mockReturnValue(false);

        const context = mockExecutionContext('guest');
        expect(guard.canActivate(context)).toBe(false);
    });

    it('permite acceso con entorno tomado desde process.env.NODE_ENV', () => {
        process.env.NODE_ENV = 'test';
        const options: FeatureFlagOptions = { entornos: ['test'] };
        (reflector.get as jest.Mock).mockReturnValue(options);
        (featureFlagService.featureHabilitada as jest.Mock).mockReturnValue(true);

        const context = mockExecutionContext('admin');
        expect(guard.canActivate(context)).toBe(true);
        expect(featureFlagService.featureHabilitada).toHaveBeenCalledWith(options, {
            entorno: 'test',
            usuario: 'admin',
        });
    });
});
