import { Test, TestingModule } from '@nestjs/testing';
import { PerfisController } from './perfis.controller';
import { PerfisService } from './perfis.service';
import { DatabaseModule } from '../database/database.module';

describe('PerfisController', () => {
  let controller: PerfisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [PerfisController],
      providers: [PerfisService],
    }).compile();

    controller = module.get<PerfisController>(PerfisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
