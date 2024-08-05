import { Test, TestingModule } from '@nestjs/testing';
import { TiposServidoresService } from './tipos_servidores.service';
import { DatabaseModule } from '../database/database.module';

describe('TiposServidoresService', () => {
  let service: TiposServidoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [TiposServidoresService],
    }).compile();

    service = module.get<TiposServidoresService>(TiposServidoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
