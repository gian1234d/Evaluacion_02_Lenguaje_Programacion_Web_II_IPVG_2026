# Inventario tecnológico

Evaluación 02 de Lenguaje de Programación Web II, IPVG 2026.

Estudiante: Gian Piero Alejandro Placencia Squadrito.

Aplicación para administrar equipos tecnológicos.

## Primer avance

- Frontend: Vue con Vite, usando JavaScript.
- Backend: NestJS, usando TypeScript.
- Dependencias instaladas para usar MySQL, TypeORM y validaciones más adelante.

Todavía no están implementados la conexión a MySQL ni el CRUD de equipos.

## Carpetas

- `frontend/src`: pantalla y estilos.
- `backend/src`: código de la API.
- `backend/.env.example`: ejemplo de configuración sin contraseñas reales.

## Cómo ejecutar

Se necesita Node.js 22.12 o superior y npm. Para este inicio no se necesita tener MySQL funcionando.

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

## Comprobaciones del inicio

Frontend y backend compilan correctamente. La prueba inicial de NestJS pasa.

`npm audit` reporta 4 alertas altas relacionadas con Multer en las dependencias de NestJS. La corrección automática propone cambiar la versión principal de NestJS; queda pendiente revisar una actualización compatible.
