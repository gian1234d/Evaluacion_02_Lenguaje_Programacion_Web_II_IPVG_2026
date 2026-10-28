<script setup>
import { computed, onMounted, ref } from 'vue'
import EquipoFormulario from './components/EquipoFormulario.vue'
import {
  listarEquipos, obtenerEquipo, crearEquipo, actualizarEquipo, eliminarEquipo,
} from './services/equipos'

const equipos = ref([])
const busqueda = ref('')
const cargando = ref(false)
const ocupado = ref(false)
const error = ref('')
const mensaje = ref('')
const mostrarFormulario = ref(false)
const equipoEditar = ref(null)
const detalle = ref(null)

const equiposFiltrados = computed(() => {
  const texto = busqueda.value.toLocaleLowerCase().trim()
  return equipos.value.filter((equipo) => [
    equipo.nombre, equipo.codigoInventario, equipo.tipo, equipo.ubicacion, equipo.estado,
  ].some((valor) => valor.toLocaleLowerCase().includes(texto)))
})

async function cargarEquipos() {
  cargando.value = true
  error.value = ''
  try {
    equipos.value = await listarEquipos()
  } catch (e) {
    error.value = e.message
  } finally {
    cargando.value = false
  }
}

function nuevoEquipo() {
  error.value = ''
  mensaje.value = ''
  equipoEditar.value = null
  detalle.value = null
  mostrarFormulario.value = true
}

function cancelarFormulario() {
  mostrarFormulario.value = false
  equipoEditar.value = null
  error.value = ''
}

async function verEquipo(id, editar = false) {
  ocupado.value = true
  error.value = ''
  mensaje.value = ''
  try {
    const equipo = await obtenerEquipo(id)
    if (editar) {
      equipoEditar.value = equipo
      detalle.value = null
      mostrarFormulario.value = true
    } else {
      detalle.value = equipo
      mostrarFormulario.value = false
    }
  } catch (e) {
    error.value = e.message
  } finally {
    ocupado.value = false
  }
}

async function guardarEquipo(datos) {
  ocupado.value = true
  error.value = ''
  mensaje.value = ''
  try {
    if (equipoEditar.value) {
      await actualizarEquipo(equipoEditar.value.id, datos)
      mensaje.value = 'Equipo actualizado correctamente.'
    } else {
      await crearEquipo(datos)
      mensaje.value = 'Equipo registrado correctamente.'
    }
    mostrarFormulario.value = false
    equipoEditar.value = null
    await cargarEquipos()
  } catch (e) {
    error.value = e.message
  } finally {
    ocupado.value = false
  }
}

async function borrarEquipo(equipo) {
  if (!window.confirm(`¿Eliminar el equipo "${equipo.nombre}"?`)) return
  ocupado.value = true
  error.value = ''
  mensaje.value = ''
  try {
    await eliminarEquipo(equipo.id)
    if (detalle.value?.id === equipo.id) detalle.value = null
    if (equipoEditar.value?.id === equipo.id) cancelarFormulario()
    mensaje.value = 'Equipo eliminado correctamente.'
    await cargarEquipos()
  } catch (e) {
    error.value = e.message
  } finally {
    ocupado.value = false
  }
}

onMounted(cargarEquipos)
</script>

<template>
  <main>
    <header>
      <h1>Inventario tecnológico</h1>
      <p>Registro de equipos · Evaluación 02</p>
    </header>

    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <p v-if="mensaje" class="exito" role="status">{{ mensaje }}</p>
    <p v-if="ocupado" role="status">Procesando solicitud...</p>

    <div class="barra">
      <button :disabled="ocupado || cargando || mostrarFormulario" @click="nuevoEquipo">Nuevo equipo</button>
      <button class="secundario" :disabled="ocupado || cargando" @click="mensaje = ''; cargarEquipos()">Actualizar lista</button>
    </div>

    <EquipoFormulario
      v-if="mostrarFormulario"
      :equipo="equipoEditar"
      :guardando="ocupado || cargando"
      @guardar="guardarEquipo"
      @cancelar="cancelarFormulario"
    />

    <section v-if="detalle" class="panel">
      <h2>Detalle del equipo</h2>
      <dl>
        <dt>Código</dt><dd>{{ detalle.codigoInventario }}</dd>
        <dt>Nombre</dt><dd>{{ detalle.nombre }}</dd>
        <dt>Tipo</dt><dd>{{ detalle.tipo }}</dd>
        <dt>Marca</dt><dd>{{ detalle.marca }}</dd>
        <dt>Modelo</dt><dd>{{ detalle.modelo }}</dd>
        <dt>Ubicación</dt><dd>{{ detalle.ubicacion }}</dd>
        <dt>Estado</dt><dd>{{ detalle.estado }}</dd>
        <dt>Fecha de adquisición</dt><dd>{{ detalle.fechaAdquisicion }}</dd>
        <dt>Observaciones</dt><dd>{{ detalle.observaciones || 'Sin observaciones' }}</dd>
      </dl>
      <button class="secundario" @click="detalle = null">Cerrar detalle</button>
    </section>

    <section class="panel">
      <h2>Equipos registrados</h2>
      <label>Buscar por nombre, código, tipo, ubicación o estado
        <input v-model="busqueda" type="search" placeholder="Buscar equipo..." />
      </label>
      <p v-if="cargando" role="status">Cargando equipos...</p>
      <template v-else>
        <p v-if="!equipos.length && !error">No hay equipos registrados.</p>
        <p v-else-if="equipos.length && !equiposFiltrados.length">No se encontraron equipos para esa búsqueda.</p>
        <template v-else-if="equiposFiltrados.length">
          <p>{{ equiposFiltrados.length }} equipo(s)</p>
          <div class="tabla">
            <table>
              <thead>
                <tr><th>Código</th><th>Nombre</th><th>Tipo</th><th>Ubicación</th><th>Estado</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                <tr v-for="equipo in equiposFiltrados" :key="equipo.id">
                  <td>{{ equipo.codigoInventario }}</td>
                  <td>{{ equipo.nombre }}</td>
                  <td>{{ equipo.tipo }}</td>
                  <td>{{ equipo.ubicacion }}</td>
                  <td>{{ equipo.estado }}</td>
                  <td>
                    <div class="acciones">
                      <button class="secundario" :disabled="ocupado" @click="verEquipo(equipo.id)">Ver</button>
                      <button :disabled="ocupado" @click="verEquipo(equipo.id, true)">Editar</button>
                      <button class="peligro" :disabled="ocupado" @click="borrarEquipo(equipo)">Eliminar</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </template>
    </section>
  </main>
</template>
