import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioCategoriesService } from './portfolio-categories.service';

describe('PortfolioCategoriesService', () => {
  let service: PortfolioCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioCategoriesService],
    }).compile();

    service = module.get<PortfolioCategoriesService>(PortfolioCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
