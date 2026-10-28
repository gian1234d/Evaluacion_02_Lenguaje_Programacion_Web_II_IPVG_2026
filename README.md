# Inventario tecnológico

Evaluación 02 de Lenguaje de Programación Web II, IPVG 2026.

Estudiante: Gian Piero Alejandro Placencia Squadrito.

Aplicación para administrar equipos tecnológicos.

## Avance actual

- Frontend: Vue con Vite, usando JavaScript.
- Backend: NestJS, usando TypeScript.
- MySQL conectado al backend mediante TypeORM y variables de entorno.
- Entidad `Equipo` y tabla `equipos` creadas.

Vue ya consume la API de NestJS: permite listar, registrar, consultar, editar, eliminar con confirmación y buscar equipos. Muestra mensajes de carga, éxito y error.

## Carpetas

- `frontend/src/App.vue`: listado, búsqueda y acciones de los equipos.
- `frontend/src/components/EquipoFormulario.vue`: formulario para registrar y editar.
- `frontend/src/services/equipos.js`: solicitudes `fetch` a la API.
- `frontend/src/style.css`: estilos sencillos de la pantalla.
- `backend/src`: código de la API.
- `backend/src/equipos`: entidad, módulo, controlador, servicio y DTO de los equipos.
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

Backend: http://localhost:3000; listado en http://localhost:3000/equipos.
Frontend: http://localhost:5173. Vite usa ese puerto fijo para coincidir con CORS del backend. Si está ocupado, cerrar el proceso que lo esté usando.

Mantener las dos terminales abiertas y MySQL iniciado. El frontend llama a `http://localhost:3000/equipos`; esa dirección está en `frontend/src/services/equipos.js`.

Para comprobar que compilan, ejecutar `npm run build` dentro de cada carpeta.


## API de equipos

| Método | Ruta | Función |
| --- | --- | --- |
| GET | `/equipos` | Listar equipos |
| GET | `/equipos/:id` | Consultar un equipo |
| POST | `/equipos` | Crear un equipo |
| PATCH | `/equipos/:id` | Editar un equipo |
| DELETE | `/equipos/:id` | Eliminar un equipo |


## Uso de IA

Se utilizó Codex de OpenAI solo como apoyo en la revisión de errores y la instalación de MySQL.

## Comprobaciones realizadas

- Se utilizó Postman para probar los métodos GET, POST, PATCH y DELETE de la API.
- Se revisaron las respuestas y el envío de datos en formato JSON.
- Se comprobó el rechazo de datos inválidos y el error 404 para equipos inexistentes.
- Se probaron los formularios, la búsqueda y las acciones desde Vue.
- Se verificó que los datos permanecen guardados al reiniciar el backend.
- Se registraron 5 equipos de ejemplo.
- El frontend y el backend compilan correctamente.
