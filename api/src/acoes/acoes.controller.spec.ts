import { Test, TestingModule } from '@nestjs/testing';
import { AcoesController } from './acoes.controller';
import { AcoesService } from './acoes.service';
import { DatabaseModule } from '../database/database.module';

describe('AcoesController', () => {
  let controller: AcoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [AcoesController],
      providers: [AcoesService],
    }).compile();

    controller = module.get<AcoesController>(AcoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
