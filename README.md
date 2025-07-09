# libreria-feature-flags

Un paquete para NestJS que permite habilitar o deshabilitar funcionalidades de forma dinámica mediante **Feature Flags** usando decoradores y guards. Útil para activar funcionalidades por entorno (`dev`, `test`, `prod`) o por usuario (por nombre).

---

## ✨ Características

- Decorador `@FeatureFlag()` para aplicar restricciones a endpoints.
- Compatible con entornos y usuarios definidos.
- Funciona con autenticación por JWT (recomendado).
- Modular, testeado y fácil de extender.
- Guard global opcional para no repetir lógica.
- Implementado completamente en TypeScript.

---

## 📦 Instalación

```bash
npm install git+https://github.com/Sandro7020/libreria-feature-flags.git
```

---

## ⚙️ Configuración

### 1. Importar el módulo en tu aplicación NestJS:

```ts
import { Module } from '@nestjs/common';
import { FeatureFlagModule } from 'nestjs-feature-flags';

@Module({
  imports: [FeatureFlagModule],
})
export class AppModule {}
```

Esto registra automáticamente el `FeatureFlagGuard` globalmente.

### 2. Asegúrate de tener autenticación con JWT

El `FeatureFlagGuard` espera que el `username` esté en `req.user.username`. Puedes usar el paquete `@nestjs/passport` con `JwtStrategy` para manejar esto (ver ejemplo más abajo).

---

## 🧩 Uso básico

```ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeatureFlag } from 'nestjs-feature-flags';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  @Get('beta')
  @UseGuards(AuthGuard('jwt')) // JWT obligatorio para identificar usuario
  @FeatureFlag({ entornos: ['dev'], usuariosPermitidos: ['admin'] })
  getBetaFeature() {
    return 'Esta funcionalidad está disponible solo para admin en dev';
  }
}
```

---

## 🔐 ¿Cómo se determina el acceso?

La función `@FeatureFlag({ ... })` puede incluir:

| Propiedad        | Tipo          | Descripción                                         |
|------------------|---------------|-----------------------------------------------------|
| `entornos`   | `string[]`    | Lista de entornos válidos (ej: `['dev', 'test']`)   |
| `usuariosPermitidos`   | `string[]`    | Lista de usuarios válidos (por nombre/username)     |

El guard permitirá acceso si ambas condiciones (si están definidas) se cumplen.

---

## 🧪 Pruebas

Este paquete incluye pruebas unitarias para:

- `FeatureFlagService`: lógica central de validación.
- `FeatureFlagGuard`: integración con el decorador, Reflector y contexto de ejecución.

Puedes correr los tests con:

```bash
npm run test
```

---

## 📁 Estructura del proyecto

```
nestjs-feature-flags/
├── src/
│   ├── feature-flag/        # Componente de feature-flags
|   |   ├── feature-flag-options.interface.ts 
|   |   ├── feature-flag.decorator.ts
|   |   ├── feature-flag.guard.ts 
|   |   ├── feature-flag.module.ts
|   |   └── feature-flag.service.ts
│   └── test/                # Pruebas unitarias
├── README.md
├── package.json
├── tsconfig.json
.
.
.
```

---

## 📌 Ejemplo completo con autenticación

```ts
// auth.controller.ts
@Post('login')
async login(@Body() body: { username: string, password: string }) {
  const user = await this.authService.validateUser(body.username, body.password);
  if (!user) throw new UnauthorizedException();
  return this.authService.login(user); // retorna un JWT
}

// feature-protected.controller.ts
@UseGuards(AuthGuard('jwt'))
@Get('experimental')
@FeatureFlag({ entornos: ['dev'], usuariosPermitidos: ['admin'] })
getExperimentalFeature() {
  return 'Solo visible para admin en entorno dev';
}
```

---

## 📢 Consejos

- Usa variables de entorno para controlar `NODE_ENV`.
- Mantén la lógica de flags separada de tu lógica de negocio.
- Puedes extender este paquete para que las flags se carguen desde una base de datos o archivo.

---

## 👥 Autores
- Alessandro Ventresca y David Yépez
- Proyecto desarrollado para el curso *Tópicos Especiales de Programación* (NRC 25996).

---

## 📝 Licencia

MIT

---
