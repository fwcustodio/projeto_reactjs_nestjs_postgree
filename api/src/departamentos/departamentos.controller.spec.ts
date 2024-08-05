import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentosController } from './departamentos.controller';
import { DepartamentosService } from './departamentos.service';
import { DatabaseModule } from '../database/database.module';

describe('DepartamentosController', () => {
  let controller: DepartamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [DepartamentosController],
      providers: [DepartamentosService],
    }).compile();

    controller = module.get<DepartamentosController>(DepartamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
