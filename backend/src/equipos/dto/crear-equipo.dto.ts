import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CrearEquipoDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(3, 100, { message: 'El código debe tener entre 3 y 100 caracteres.' })
  codigoInventario: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(3, 150, { message: 'El nombre debe tener entre 3 y 150 caracteres.' })
  nombre: string;

  @IsString()
  @Length(1, 100)
  @Matches(/\S/, { message: 'El tipo no puede estar vacío.' })
  tipo: string;

  @IsString()
  @Length(1, 100)
  @Matches(/\S/, { message: 'La marca no puede estar vacía.' })
  marca: string;

  @IsString()
  @Length(1, 100)
  @Matches(/\S/, { message: 'El modelo no puede estar vacío.' })
  modelo: string;

  @IsString()
  @Length(1, 150)
  @Matches(/\S/, { message: 'La ubicación no puede estar vacía.' })
  ubicacion: string;

  @IsIn(['Disponible', 'En uso', 'Mantención', 'Baja'], {
    message: 'El estado debe ser Disponible, En uso, Mantención o Baja.',
  })
  estado: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha debe tener el formato AAAA-MM-DD.',
  })
  @IsDateString(
    { strict: true },
    { message: 'La fecha de adquisición no es válida.' },
  )
  fechaAdquisicion: string;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser texto.' })
  observaciones?: string | null;
}
