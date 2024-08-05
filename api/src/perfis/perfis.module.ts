import { Module } from '@nestjs/common';
import { PerfisService } from './perfis.service';
import { PerfisController } from './perfis.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PerfisController],
  providers: [PerfisService],
})
export class PerfisModule {}
