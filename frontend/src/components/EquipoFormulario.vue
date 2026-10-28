<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  equipo: { type: Object, default: null },
  guardando: Boolean,
})
const emit = defineEmits(['guardar', 'cancelar'])
const formulario = reactive({})

// Copia los datos: editar el formulario no cambia la tabla hasta guardar.
watch(() => props.equipo, (equipo) => {
  Object.assign(formulario, {
    codigoInventario: equipo?.codigoInventario ?? '',
    nombre: equipo?.nombre ?? '',
    tipo: equipo?.tipo ?? '',
    marca: equipo?.marca ?? '',
    modelo: equipo?.modelo ?? '',
    ubicacion: equipo?.ubicacion ?? '',
    estado: equipo?.estado ?? 'Disponible',
    fechaAdquisicion: equipo?.fechaAdquisicion ?? '',
    observaciones: equipo?.observaciones ?? '',
  })
}, { immediate: true })
</script>

<template>
  <section class="panel">
    <h2>{{ equipo ? 'Editar equipo' : 'Registrar equipo' }}</h2>
    <p>Todos los campos son obligatorios, excepto las observaciones.</p>
    <form @submit.prevent="emit('guardar', { ...formulario })">
      <fieldset :disabled="guardando">
        <div class="campos">
          <label>Código de inventario
            <input v-model.trim="formulario.codigoInventario" required minlength="3" maxlength="100" />
          </label>
          <label>Nombre
            <input v-model.trim="formulario.nombre" required minlength="3" maxlength="150" />
          </label>
          <label>Tipo
            <input v-model.trim="formulario.tipo" required maxlength="100" placeholder="Ej.: Notebook" />
          </label>
          <label>Marca
            <input v-model.trim="formulario.marca" required maxlength="100" />
          </label>
          <label>Modelo
            <input v-model.trim="formulario.modelo" required maxlength="100" />
          </label>
          <label>Ubicación
            <input v-model.trim="formulario.ubicacion" required maxlength="150" />
          </label>
          <label>Estado
            <select v-model="formulario.estado" required>
              <option>Disponible</option>
              <option>En uso</option>
              <option>Mantención</option>
              <option>Baja</option>
            </select>
          </label>
          <label>Fecha de adquisición
            <input v-model="formulario.fechaAdquisicion" type="date" required />
          </label>
        </div>
        <label>Observaciones
          <textarea v-model.trim="formulario.observaciones" rows="3"></textarea>
        </label>
        <div class="acciones">
          <button type="submit">{{ guardando ? 'Guardando...' : 'Guardar equipo' }}</button>
          <button class="secundario" type="button" @click="emit('cancelar')">Cancelar</button>
        </div>
      </fieldset>
    </form>
  </section>
</template>
