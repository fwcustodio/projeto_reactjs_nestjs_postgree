import { Test, TestingModule } from '@nestjs/testing';
import { DepartamentosService } from './departamentos.service';
import { DatabaseModule } from '../database/database.module';

describe('DepartamentosService', () => {
  let service: DepartamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DepartamentosService],
    }).compile();

    service = module.get<DepartamentosService>(DepartamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
