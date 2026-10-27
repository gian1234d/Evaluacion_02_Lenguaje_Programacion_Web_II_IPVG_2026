import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  codigoInventario: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  tipo: string;

  @Column({ type: 'varchar', length: 100 })
  marca: string;

  @Column({ type: 'varchar', length: 100 })
  modelo: string;

  @Column({ type: 'varchar', length: 150 })
  ubicacion: string;

  @Column({
    type: 'enum',
    enum: ['Disponible', 'En uso', 'Mantención', 'Baja'],
  })
  estado: string;

  @Column({ type: 'date' })
  fechaAdquisicion: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string | null;
}
