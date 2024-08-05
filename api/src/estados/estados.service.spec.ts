import { Test, TestingModule } from '@nestjs/testing';
import { EstadosService } from './estados.service';
import { DatabaseModule } from '../database/database.module';

describe('EstadosService', () => {
  let service: EstadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [EstadosService],
    }).compile();

    service = module.get<EstadosService>(EstadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
