import { Test, TestingModule } from '@nestjs/testing';
import { OrgaosController } from './orgaos.controller';
import { OrgaosService } from './orgaos.service';
import { DatabaseModule } from '../database/database.module';

describe('OrgaosController', () => {
  let controller: OrgaosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [OrgaosController],
      providers: [OrgaosService],
    }).compile();

    controller = module.get<OrgaosController>(OrgaosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
