import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './equipo.entity.js';
import { CrearEquipoDto } from './dto/crear-equipo.dto.js';
import { ActualizarEquipoDto } from './dto/actualizar-equipo.dto.js';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equiposRepository: Repository<Equipo>,
  ) {}

  listar() {
    return this.equiposRepository.find({ order: { id: 'ASC' } });
  }

  async buscarPorId(id: number) {
    const equipo = await this.equiposRepository.findOneBy({ id });
    if (!equipo) {
      throw new NotFoundException(`No existe el equipo con ID ${id}.`);
    }
    return equipo;
  }

  crear(datos: CrearEquipoDto) {
    const equipo = this.equiposRepository.create(datos);
    return this.equiposRepository.save(equipo);
  }

  async actualizar(id: number, datos: ActualizarEquipoDto) {
    const equipo = await this.buscarPorId(id);
    this.equiposRepository.merge(equipo, datos);
    return this.equiposRepository.save(equipo);
  }

  async eliminar(id: number) {
    const equipo = await this.buscarPorId(id);
    await this.equiposRepository.remove(equipo);
    return { message: 'Equipo eliminado correctamente.' };
  }
}
