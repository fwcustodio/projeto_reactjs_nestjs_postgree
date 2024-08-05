import { Test, TestingModule } from '@nestjs/testing';
import { EstadosController } from './estados.controller';
import { EstadosService } from './estados.service';
import { DatabaseModule } from '../database/database.module';

describe('EstadosController', () => {
  let controller: EstadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [EstadosController],
      providers: [EstadosService],
    }).compile();

    controller = module.get<EstadosController>(EstadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
