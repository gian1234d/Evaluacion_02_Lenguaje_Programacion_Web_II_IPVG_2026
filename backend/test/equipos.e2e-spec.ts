import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module.js';
import { Equipo } from '../src/equipos/equipo.entity.js';

// Usa MySQL real y elimina únicamente el registro creado por esta prueba.
describe('CRUD de equipos', () => {
  let app: INestApplication<App>;
  let repository: Repository<Equipo>;
  let id: number | undefined;

  const datos = {
    codigoInventario: `TEST-${Date.now()}`,
    nombre: 'Notebook de prueba',
    tipo: 'Notebook',
    marca: 'Lenovo',
    modelo: 'ThinkPad',
    ubicacion: 'Laboratorio',
    estado: 'Disponible',
    fechaAdquisicion: '2026-10-28',
  };

  beforeAll(async () => {
    const modulo = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = modulo.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    repository = app.get<Repository<Equipo>>(getRepositoryToken(Equipo));
  });

  afterAll(async () => {
    if (id !== undefined) await repository.delete(id);
    await app.close();
  });

  it('crea, lista, consulta, edita y elimina un equipo', async () => {
    const servidor = app.getHttpServer();
    const creado = await request(servidor)
      .post('/equipos')
      .send(datos)
      .expect(201);
    id = creado.body.id as number;
    expect(id).toBeTypeOf('number');

    const lista = await request(servidor).get('/equipos').expect(200);
    expect(lista.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id,
          codigoInventario: datos.codigoInventario,
        }),
      ]),
    );

    const detalle = await request(servidor).get(`/equipos/${id}`).expect(200);
    expect(detalle.body.fechaAdquisicion).toBe(datos.fechaAdquisicion);

    await request(servidor)
      .patch(`/equipos/${id}`)
      .send({ estado: 'En uso' })
      .expect(200);
    const actualizado = await request(servidor)
      .get(`/equipos/${id}`)
      .expect(200);
    expect(actualizado.body.estado).toBe('En uso');
    expect(actualizado.body.nombre).toBe(datos.nombre);

    // PATCH tampoco permite borrar campos obligatorios ni cambiar el ID.
    await request(servidor)
      .patch(`/equipos/${id}`)
      .send({ nombre: null })
      .expect(400);
    await request(servidor)
      .patch(`/equipos/${id}`)
      .send({ id: 999 })
      .expect(400);
    await request(servidor)
      .patch(`/equipos/${id}`)
      .send({ estado: 'Incorrecto' })
      .expect(400);

    await request(servidor).delete(`/equipos/${id}`).expect(200);
    await request(servidor).get(`/equipos/${id}`).expect(404);
    await request(servidor)
      .patch(`/equipos/${id}`)
      .send({ nombre: 'Otro nombre' })
      .expect(404);
    await request(servidor).delete(`/equipos/${id}`).expect(404);
  });

  it('rechaza datos incompletos, inválidos o no declarados', async () => {
    const invalidos = [
      {},
      { ...datos, codigoInventario: 'ab' },
      { ...datos, nombre: '   ' },
      { ...datos, marca: ' ' },
      { ...datos, estado: 'Incorrecto' },
      { ...datos, fechaAdquisicion: '2026-02-30' },
      { ...datos, fechaAdquisicion: '28/10/2026' },
      { ...datos, nombre: 123 },
      { ...datos, id: 999 },
    ];
    for (const cuerpo of invalidos) {
      const respuesta = await request(app.getHttpServer())
        .post('/equipos')
        .send(cuerpo)
        .expect(400);
      expect(respuesta.body.message).toBeInstanceOf(Array);
    }
  });

  it('rechaza un ID que no sea numérico', async () => {
    await request(app.getHttpServer()).get('/equipos/abc').expect(400);
  });
});
