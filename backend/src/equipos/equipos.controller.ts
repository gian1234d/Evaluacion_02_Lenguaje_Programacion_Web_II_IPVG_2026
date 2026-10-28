import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EquiposService } from './equipos.service.js';
import { CrearEquipoDto } from './dto/crear-equipo.dto.js';
import { ActualizarEquipoDto } from './dto/actualizar-equipo.dto.js';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Get()
  listar() {
    return this.equiposService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.equiposService.buscarPorId(id);
  }

  @Post()
  crear(@Body() datos: CrearEquipoDto) {
    return this.equiposService.crear(datos);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: ActualizarEquipoDto,
  ) {
    return this.equiposService.actualizar(id, datos);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.equiposService.eliminar(id);
  }
}
