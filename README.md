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

Backend: http://localhost:3000; listado en http://localhost:3000/equipos.
Frontend: http://localhost:5173. Vite usa ese puerto fijo para coincidir con CORS del backend. Si está ocupado, cerrar el proceso que lo esté usando.

Mantener las dos terminales abiertas y MySQL iniciado. El frontend llama a `http://localhost:3000/equipos`; esa dirección está en `frontend/src/services/equipos.js`.

Para comprobar que compilan, ejecutar `npm run build` dentro de cada carpeta.

## Usar la interfaz

1. Abrir el frontend y presionar **Nuevo equipo**.
2. Completar los campos y guardar. La fecha se envía como `AAAA-MM-DD`.
3. Usar **Ver** para consultar el detalle o **Editar** para cambiar los datos.
4. Escribir en la búsqueda para filtrar por nombre, código, tipo, ubicación o estado.
5. **Eliminar** solicita confirmación antes de borrar.
6. Si falla la conexión, comprobar el backend y presionar **Actualizar lista**.

## API de equipos

| Método | Ruta | Función |
| --- | --- | --- |
| GET | `/equipos` | Listar equipos |
| GET | `/equipos/:id` | Consultar un equipo |
| POST | `/equipos` | Crear un equipo |
| PATCH | `/equipos/:id` | Editar un equipo |
| DELETE | `/equipos/:id` | Eliminar un equipo |

Ejemplo de JSON para crear un equipo:

```json
{
  "codigoInventario": "EQ-001",
  "nombre": "Notebook laboratorio",
  "tipo": "Notebook",
  "marca": "Lenovo",
  "modelo": "ThinkPad",
  "ubicacion": "Laboratorio 1",
  "estado": "Disponible",
  "fechaAdquisicion": "2026-10-28",
  "observaciones": "Equipo para clases"
}
```

`observaciones` es opcional. Para editar con PATCH se envían solo los campos que cambian.

Las solicitudes inválidas responden con 400 y una lista de errores en `message`. Un ID inexistente responde con 404. Solo se permiten los campos declarados en los DTO. CORS permite el frontend en `http://localhost:5173`.

## Uso de IA

Se utilizó Codex de OpenAI solo como apoyo en la revisión de errores y la instalación de MySQL.

## Comprobaciones realizadas

- Frontend y backend compilan correctamente.
- Se probó la interfaz en Safari con la API y MySQL: registro, detalle, edición, búsqueda con y sin coincidencias, confirmación de eliminación y cancelación.
- Se probó la eliminación mediante el servicio `fetch` del frontend y se retiró el registro temporal.
- Al detener el backend, la interfaz muestra un mensaje de conexión comprensible.
- La prueba inicial de NestJS pasa.
- Las pruebas HTTP pasan con MySQL conectado (`npm run test:e2e` en `backend`): crear, listar, consultar, editar y eliminar; errores 400 y 404; fechas inválidas, campos extra y campos obligatorios nulos. Las pruebas limpian el equipo temporal que crean.
- Se guardó un equipo temporal con el repositorio de TypeORM, se cerró NestJS y se volvió a iniciar. El equipo seguía guardado en MySQL. Luego se eliminó ese registro de prueba.
- La tabla contiene los campos de la evaluación. Los datos de ejemplo se agregarán en otro avance.

Se actualizaron las dependencias compatibles de NestJS y Multer con `npm audit fix`. La auditoría del backend reporta 0 vulnerabilidades en esta revisión.

Referencia de configuración: [documentación de NestJS](https://docs.nestjs.com/techniques/configuration).

Referencia de validaciones: [documentación de NestJS](https://docs.nestjs.com/techniques/validation).

Referencia de formularios: [documentación de Vue](https://vuejs.org/guide/essentials/forms.html).
