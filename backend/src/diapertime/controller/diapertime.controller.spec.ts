import { Test, TestingModule } from '@nestjs/testing';
import { DiapertimeController } from './diapertime.controller';

describe('DiapertimeController', () => {
  let controller: DiapertimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiapertimeController],
    }).compile();

    controller = module.get<DiapertimeController>(DiapertimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
