# Backend

API creada con NestJS y conectada a MySQL con TypeORM.

## Archivos principales

- `src/app.module.ts`: carga `.env` y configura MySQL.
- `src/equipos/equipo.entity.ts`: define las columnas de la tabla `equipos`.
- `src/equipos/equipos.module.ts`: registra la entidad en TypeORM.

La entidad representa un equipo. Cada propiedad con `@Column` es una columna de MySQL. `@PrimaryGeneratedColumn` crea el ID automáticamente.

## Ejecutar

Seguir primero los pasos de MySQL y `.env` del README principal. Después, desde esta carpeta:

```bash
npm install
npm run start:dev
```

Se ejecuta en http://localhost:3000 y todavía responde `Hello World!` en `/`. El CRUD se hará en el siguiente avance.

La tabla se crea al iniciar el backend. Los registros quedan en MySQL al detener la aplicación.

## Comprobar

```bash
npm run build
npm test
npm run test:e2e
```

La prueba e2e requiere MySQL funcionando y `.env` configurado.
