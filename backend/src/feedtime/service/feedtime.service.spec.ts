import { Test, TestingModule } from '@nestjs/testing';
import { FeedtimeService } from './feedtime.service';

describe('FeedtimeService', () => {
  let service: FeedtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedtimeService],
    }).compile();

    service = module.get<FeedtimeService>(FeedtimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
