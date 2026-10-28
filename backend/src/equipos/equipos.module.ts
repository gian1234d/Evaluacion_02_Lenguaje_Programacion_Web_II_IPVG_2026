import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposController } from './equipos.controller.js';
import { EquiposService } from './equipos.service.js';
import { Equipo } from './equipo.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo])],
  controllers: [EquiposController],
  providers: [EquiposService],
})
export class EquiposModule {}
