import { Test, TestingModule } from '@nestjs/testing';
import { SubdistricttypeService } from './subdistricttype.service';

describe('SubdistricttypeService', () => {
  let service: SubdistricttypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdistricttypeService],
    }).compile();

    service = module.get<SubdistricttypeService>(SubdistricttypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
