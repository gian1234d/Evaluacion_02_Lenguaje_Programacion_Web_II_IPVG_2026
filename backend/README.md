# Backend

API creada con NestJS y conectada a MySQL con TypeORM.

## Archivos principales

- `src/app.module.ts`: carga `.env` y configura MySQL.
- `src/equipos/equipo.entity.ts`: define las columnas de la tabla `equipos`.
- `src/equipos/equipos.module.ts`: registra la entidad, el controlador y el servicio.
- `src/equipos/equipos.controller.ts`: recibe las solicitudes HTTP.
- `src/equipos/equipos.service.ts`: consulta y modifica MySQL usando Repository.
- `src/equipos/dto`: valida los datos de creación y edición.

La entidad representa un equipo. Cada propiedad con `@Column` es una columna de MySQL. `@PrimaryGeneratedColumn` crea el ID automáticamente.

## Ejecutar

Seguir primero los pasos de MySQL y `.env` del README principal. Después, desde esta carpeta:

```bash
npm install
npm run start:dev
```

Se ejecuta en http://localhost:3000. El CRUD está disponible en `/equipos`. Ver los endpoints y un ejemplo de JSON en el README principal.

`PartialType` permite reutilizar las validaciones al editar, haciendo opcionales los campos que no se envían. `ValidationPipe` valida los DTO y rechaza campos extra. `ParseIntPipe` convierte el ID de la ruta a número.

La tabla se crea al iniciar el backend. Los registros quedan en MySQL al detener la aplicación.

## Comprobar

```bash
npm run build
npm test
npm run test:e2e
```

La prueba e2e requiere MySQL funcionando y `.env` configurado.
