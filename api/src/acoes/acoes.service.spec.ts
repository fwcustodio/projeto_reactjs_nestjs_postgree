import { Test, TestingModule } from '@nestjs/testing';
import { AcoesService } from './acoes.service';
import { DatabaseModule } from '../database/database.module';

describe('AcoesService', () => {
  let service: AcoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [AcoesService],
    }).compile();

    service = module.get<AcoesService>(AcoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
