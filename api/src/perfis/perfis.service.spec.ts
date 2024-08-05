import { Test, TestingModule } from '@nestjs/testing';
import { PerfisService } from './perfis.service';
import { DatabaseModule } from '../database/database.module';

describe('PerfisService', () => {
  let service: PerfisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [PerfisService],
    }).compile();

    service = module.get<PerfisService>(PerfisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
