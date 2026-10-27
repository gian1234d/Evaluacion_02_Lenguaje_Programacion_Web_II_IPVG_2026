import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EquiposModule } from './equipos/equipos.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.getOrThrow<string>('DB_HOST'),
        port: Number(config.getOrThrow<string>('DB_PORT')),
        username: config.getOrThrow<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.getOrThrow<string>('DB_DATABASE'),
        autoLoadEntities: true,
        // Crea la tabla desde la entidad. Solo para desarrollo local.
        synchronize: true,
        charset: 'utf8mb4',
        retryAttempts: 1,
      }),
    }),
    EquiposModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
