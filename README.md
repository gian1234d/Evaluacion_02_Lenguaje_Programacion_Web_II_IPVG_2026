# Inventario tecnológico

Evaluación 02 de Lenguaje de Programación Web II, IPVG 2026.

Estudiante: Gian Piero Alejandro Placencia Squadrito.

Aplicación para administrar equipos tecnológicos.

## Avance actual

- Frontend: Vue con Vite, usando JavaScript.
- Backend: NestJS, usando TypeScript.
- MySQL conectado al backend mediante TypeORM y variables de entorno.
- Entidad `Equipo` y tabla `equipos` creadas.

El CRUD de equipos y la conexión del frontend a la API quedan para los siguientes avances.

## Carpetas

- `frontend/src`: pantalla y estilos.
- `backend/src`: código de la API.
- `backend/src/equipos`: entidad y módulo de los equipos.
- `database/crear-base.sql`: instrucción para crear la base de datos.
- `backend/.env.example`: ejemplo de configuración sin contraseñas reales.

## Cómo ejecutar

Se necesita Node.js 22.12 o superior, npm y MySQL funcionando.

Primero crear la base de datos desde la carpeta principal:

```bash
mysql -u root -p < database/crear-base.sql
```

En este Mac, si el comando `mysql` no se reconoce, usar `/usr/local/mysql/bin/mysql` en su lugar.

Después copiar el ejemplo de configuración (solo la primera vez):

```bash
cp backend/.env.example backend/.env
```

Editar `backend/.env` con el usuario y la contraseña de MySQL. Este archivo es privado y Git lo ignora. No reemplazarlo si ya tiene las credenciales configuradas.

Las variables son:

- `DB_HOST`: dirección de MySQL, normalmente `localhost`.
- `DB_PORT`: puerto de MySQL, normalmente `3306`.
- `DB_USERNAME`: usuario de MySQL.
- `DB_PASSWORD`: contraseña de ese usuario.
- `DB_DATABASE`: nombre de la base, `inventario_tecnologico`.
- `PORT`: puerto del backend, `3000`.

Al iniciar el backend, TypeORM crea la tabla `equipos` desde `equipo.entity.ts`. Se usa `synchronize: true` solo para este desarrollo local; no se debe usar así en producción.

Abrir una terminal para el backend:

```bash
cd backend
npm install
npm run start:dev
```

Abrir otra terminal para el frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend: http://localhost:3000 (respuesta inicial de NestJS).
Frontend: http://localhost:5173 (o el puerto que indique Vite).

Para comprobar que compilan, ejecutar `npm run build` dentro de cada carpeta.

## Uso de IA

Se utilizó Codex de OpenAI solo como apoyo en la revisión de errores y la instalación de MySQL.

## Comprobaciones realizadas

- Frontend y backend compilan correctamente.
- La prueba inicial de NestJS pasa.
- La prueba HTTP de `GET /` pasa con MySQL conectado (`npm run test:e2e` en `backend`).
- Se guardó un equipo temporal con el repositorio de TypeORM, se cerró NestJS y se volvió a iniciar. El equipo seguía guardado en MySQL. Luego se eliminó ese registro de prueba.
- La tabla contiene los campos de la evaluación. Los datos de ejemplo se agregarán en otro avance.

`npm audit` reporta 4 alertas altas relacionadas con Multer en las dependencias de NestJS. La corrección automática propone cambiar la versión principal de NestJS; queda pendiente revisar una actualización compatible.

Referencia de configuración: [documentación de NestJS](https://docs.nestjs.com/techniques/configuration).
