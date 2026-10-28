import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module.js';
import { Equipo } from './equipos/equipo.entity.js';

// Ejecutar desde backend con: npm run datos:prueba
// Si el código ya existe, se conserva el equipo sin modificarlo.
const equipos = [
  {
    codigoInventario: 'EQ-001',
    nombre: 'Notebook de laboratorio',
    tipo: 'Notebook',
    marca: 'Lenovo',
    modelo: 'ThinkPad E14',
    ubicacion: 'Laboratorio 1',
    estado: 'Disponible',
    fechaAdquisicion: '2025-03-10',
    observaciones: 'Equipo para clases de programación.',
  },
  {
    codigoInventario: 'EQ-002',
    nombre: 'Computador de biblioteca',
    tipo: 'PC',
    marca: 'HP',
    modelo: 'ProDesk 400',
    ubicacion: 'Biblioteca',
    estado: 'En uso',
    fechaAdquisicion: '2024-07-15',
    observaciones: 'Disponible para consultas de los estudiantes.',
  },
  {
    codigoInventario: 'EQ-003',
    nombre: 'Monitor de oficina',
    tipo: 'Monitor',
    marca: 'Samsung',
    modelo: 'T350',
    ubicacion: 'Administración',
    estado: 'Disponible',
    fechaAdquisicion: '2025-04-22',
    observaciones: 'Monitor de 24 pulgadas.',
  },
  {
    codigoInventario: 'EQ-004',
    nombre: 'Proyector de sala',
    tipo: 'Proyector',
    marca: 'Epson',
    modelo: 'PowerLite X49',
    ubicacion: 'Sala 203',
    estado: 'Mantención',
    fechaAdquisicion: '2023-08-01',
    observaciones: 'En revisión por cambio de lámpara.',
  },
  {
    codigoInventario: 'EQ-005',
    nombre: 'Computador antiguo',
    tipo: 'PC',
    marca: 'Dell',
    modelo: 'OptiPlex 3020',
    ubicacion: 'Bodega',
    estado: 'Baja',
    fechaAdquisicion: '2018-11-12',
    observaciones: 'Retirado por falla de placa madre.',
  },
];

async function cargarEquipos() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  try {
    const repository = app.get(DataSource).getRepository(Equipo);
    let agregados = 0;
    for (const datos of equipos) {
      const existente = await repository.findOneBy({
        codigoInventario: datos.codigoInventario,
      });
      if (!existente) {
        await repository.save(repository.create(datos));
        agregados++;
      }
    }
    console.log(`Se agregaron ${agregados} equipos de ejemplo.`);
    console.log(`Total de equipos en MySQL: ${await repository.count()}.`);
  } finally {
    await app.close();
  }
}

await cargarEquipos();
