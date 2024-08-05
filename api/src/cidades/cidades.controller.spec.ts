import { Test, TestingModule } from '@nestjs/testing';
import { CidadesController } from './cidades.controller';
import { CidadesService } from './cidades.service';
import { DatabaseModule } from '../database/database.module';

describe('CidadesController', () => {
  let controller: CidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CidadesController],
      providers: [CidadesService],
    }).compile();

    controller = module.get<CidadesController>(CidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
