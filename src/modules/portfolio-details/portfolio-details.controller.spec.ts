import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioDetailsController } from './portfolio-details.controller';
import { PortfolioDetailsService } from './portfolio-details.service';

describe('PortfolioDetailsController', () => {
  let controller: PortfolioDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioDetailsController],
      providers: [PortfolioDetailsService],
    }).compile();

    controller = module.get<PortfolioDetailsController>(PortfolioDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
