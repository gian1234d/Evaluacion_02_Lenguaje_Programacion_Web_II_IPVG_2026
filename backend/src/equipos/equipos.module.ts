import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './equipo.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo])],
  exports: [TypeOrmModule],
})
export class EquiposModule {}
