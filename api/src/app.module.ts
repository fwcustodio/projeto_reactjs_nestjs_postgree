import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { AuthMiddleware } from './middleware/auth_middleware';
import { LoggerMiddleware } from './middleware/logger_middleware';
import { MainMiddleware } from './middleware/main_middleware';

import { EstadosModule } from './estados/estados.module';
import { CidadesModule } from './cidades/cidades.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { AcoesModule } from './acoes/acoes.module';
import { OrgaosModule } from './orgaos/orgaos.module';
import { TelasModule } from './funcionalidades/funcionalidades.module';
import { PerfisModule } from './perfis/perfis.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TiposServidoresModule } from './tipos_servidores/tipos_servidores.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    HttpModule,
    HealthModule,
    EstadosModule,
    CidadesModule,
    DepartamentosModule,
    AcoesModule,
    OrgaosModule,
    TelasModule,
    PerfisModule,
    UsuariosModule,
    TiposServidoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).exclude('public/(.*)').forRoutes('*');
    consumer.apply(MainMiddleware).forRoutes('*');
  }
}
