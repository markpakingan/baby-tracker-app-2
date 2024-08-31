import { Test, TestingModule } from '@nestjs/testing';
import { FeedtimeController } from './feedtime.controller';

describe('FeedtimeController', () => {
  let controller: FeedtimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedtimeController],
    }).compile();

    controller = module.get<FeedtimeController>(FeedtimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
