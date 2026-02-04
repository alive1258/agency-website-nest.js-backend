import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioDetailsService } from './portfolio-details.service';

describe('PortfolioDetailsService', () => {
  let service: PortfolioDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioDetailsService],
    }).compile();

    service = module.get<PortfolioDetailsService>(PortfolioDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
