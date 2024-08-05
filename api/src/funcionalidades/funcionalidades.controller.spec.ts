import { Test, TestingModule } from '@nestjs/testing';
import { TelasController } from './funcionalidades.controller';
import { FuncionalidadesService } from './funcionalidades.service';
import { DatabaseModule } from '../database/database.module';

describe('FuncionalidadesController', () => {
  let controller: TelasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [TelasController],
      providers: [FuncionalidadesService],
    }).compile();

    controller = module.get<TelasController>(TelasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
