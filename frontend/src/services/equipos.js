const URL = 'http://localhost:3000/equipos'

// Todas las solicitudes al backend pasan por esta función.
async function solicitar(ruta = '', opciones = {}) {
  let respuesta
  try {
    respuesta = await fetch(`${URL}${ruta}`, {
      ...opciones,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    throw new Error('No se pudo conectar con el backend. Revisa que esté iniciado en el puerto 3000.')
  }

  const datos = await respuesta.json()
  if (!respuesta.ok) {
    const mensaje = datos.message || 'No se pudo realizar la operación.'
    throw new Error(Array.isArray(mensaje) ? mensaje.join('\n') : mensaje)
  }
  return datos
}

export const listarEquipos = () => solicitar()
export const obtenerEquipo = (id) => solicitar(`/${id}`)
export const crearEquipo = (equipo) => solicitar('', {
  method: 'POST', body: JSON.stringify(equipo),
})
export const actualizarEquipo = (id, equipo) => solicitar(`/${id}`, {
  method: 'PATCH', body: JSON.stringify(equipo),
})
export const eliminarEquipo = (id) => solicitar(`/${id}`, { method: 'DELETE' })
