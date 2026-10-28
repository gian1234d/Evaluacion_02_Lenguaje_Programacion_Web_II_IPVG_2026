# Frontend

Interfaz sencilla creada con Vue y Vite. Se conecta a NestJS usando `fetch` y JSON.

## Ejecutar

Primero iniciar MySQL y el backend según el README principal. Luego, desde esta carpeta:

```bash
npm install
npm run dev
```

Abrir http://localhost:5173. El backend debe estar en http://localhost:3000.

## Archivos

- `src/App.vue`: guarda el listado en un `ref`, carga los equipos al abrir la pantalla y filtra con `computed`.
- `src/components/EquipoFormulario.vue`: usa `v-model` para los campos y envía el evento `guardar`.
- `src/services/equipos.js`: reúne las llamadas HTTP y los errores de la API.
- `src/style.css`: estilos de la interfaz.

Después de crear, editar o eliminar, se vuelve a consultar el listado para mostrar los datos guardados en MySQL.

Para comprobar la compilación:

```bash
npm run build
```
