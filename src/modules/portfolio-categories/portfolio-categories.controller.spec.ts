import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioCategoriesController } from './portfolio-categories.controller';
import { PortfolioCategoriesService } from './portfolio-categories.service';

describe('PortfolioCategoriesController', () => {
  let controller: PortfolioCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioCategoriesController],
      providers: [PortfolioCategoriesService],
    }).compile();

    controller = module.get<PortfolioCategoriesController>(PortfolioCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
