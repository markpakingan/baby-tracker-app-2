import { Test, TestingModule } from '@nestjs/testing';
import { DiapertimeService } from './diapertime.service';

describe('DiapertimeService', () => {
  let service: DiapertimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiapertimeService],
    }).compile();

    service = module.get<DiapertimeService>(DiapertimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
