import { Module } from '@nestjs/common';
import { FuncionalidadesService } from './funcionalidades.service';
import { TelasController } from './funcionalidades.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TelasController],
  providers: [FuncionalidadesService],
})
export class TelasModule {}
