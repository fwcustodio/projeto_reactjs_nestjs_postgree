import { Test, TestingModule } from '@nestjs/testing';
import { CidadesService } from './cidades.service';
import { DatabaseModule } from '../database/database.module';

describe('CidadesService', () => {
  let service: CidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [CidadesService],
    }).compile();

    service = module.get<CidadesService>(CidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
