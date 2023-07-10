import { Test, TestingModule } from '@nestjs/testing';
import { SubdistrictController } from './subdistrict.controller';
import { SubdistrictService } from './subdistrict.service';

describe('SubdistrictController', () => {
  let controller: SubdistrictController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdistrictController],
      providers: [SubdistrictService],
    }).compile();

    controller = module.get<SubdistrictController>(SubdistrictController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
