import { PartialType } from '@nestjs/mapped-types';
import { CrearEquipoDto } from './crear-equipo.dto.js';

// Conserva las reglas de creación, pero permite enviar solo los campos a editar.
// Los campos obligatorios no pueden reemplazarse por null.
export class ActualizarEquipoDto extends PartialType(CrearEquipoDto, {
  skipNullProperties: false,
}) {}
