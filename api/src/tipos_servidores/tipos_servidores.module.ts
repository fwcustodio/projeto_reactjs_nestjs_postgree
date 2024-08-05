import { Module } from '@nestjs/common';
import { TiposServidoresService } from './tipos_servidores.service';
import { TiposServidoresController } from './tipos_servidores.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TiposServidoresController],
  providers: [TiposServidoresService],
})
export class TiposServidoresModule {}
