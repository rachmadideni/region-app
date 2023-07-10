import { Test, TestingModule } from '@nestjs/testing';
import { SubdistricttypeController } from './subdistricttype.controller';
import { SubdistricttypeService } from './subdistricttype.service';

describe('SubdistricttypeController', () => {
  let controller: SubdistricttypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdistricttypeController],
      providers: [SubdistricttypeService],
    }).compile();

    controller = module.get<SubdistricttypeController>(SubdistricttypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
