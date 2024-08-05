import { Test, TestingModule } from '@nestjs/testing';
import { OrgaosService } from './orgaos.service';
import { DatabaseModule } from '../database/database.module';
describe('OrgaosService', () => {
  let service: OrgaosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [OrgaosService],
    }).compile();

    service = module.get<OrgaosService>(OrgaosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
