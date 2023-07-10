import { Test, TestingModule } from '@nestjs/testing';
import { SubdistrictService } from './subdistrict.service';

describe('SubdistrictService', () => {
  let service: SubdistrictService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdistrictService],
    }).compile();

    service = module.get<SubdistrictService>(SubdistrictService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
