import { Test, TestingModule } from '@nestjs/testing';
import { CitytipeService } from './citytipe.service';

describe('CitytipeService', () => {
  let service: CitytipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitytipeService],
    }).compile();

    service = module.get<CitytipeService>(CitytipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
