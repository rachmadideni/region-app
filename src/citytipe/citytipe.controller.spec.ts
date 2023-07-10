import { Test, TestingModule } from '@nestjs/testing';
import { CitytipeController } from './citytipe.controller';
import { CitytipeService } from './citytipe.service';

describe('CitytipeController', () => {
  let controller: CitytipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitytipeController],
      providers: [CitytipeService],
    }).compile();

    controller = module.get<CitytipeController>(CitytipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
