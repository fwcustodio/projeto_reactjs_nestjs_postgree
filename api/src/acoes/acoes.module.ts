import { Module } from '@nestjs/common';
import { AcoesService } from './acoes.service';
import { AcoesController } from './acoes.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AcoesController],
  providers: [AcoesService],
})
export class AcoesModule {}
