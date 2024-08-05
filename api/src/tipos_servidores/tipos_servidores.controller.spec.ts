import { Test, TestingModule } from '@nestjs/testing';
import { TiposServidoresController } from './tipos_servidores.controller';
import { TiposServidoresService } from './tipos_servidores.service';
import { DatabaseModule } from '../database/database.module';

describe('TiposServidoresController', () => {
  let controller: TiposServidoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [TiposServidoresController],
      providers: [TiposServidoresService],
    }).compile();

    controller = module.get<TiposServidoresController>(
      TiposServidoresController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
