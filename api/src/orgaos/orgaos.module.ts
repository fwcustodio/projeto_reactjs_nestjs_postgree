import { Module } from '@nestjs/common';
import { OrgaosService } from './orgaos.service';
import { OrgaosController } from './orgaos.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrgaosController],
  providers: [OrgaosService],
})
export class OrgaosModule {}
