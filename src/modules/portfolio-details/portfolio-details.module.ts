import { Module } from '@nestjs/common';
import { PortfolioDetailsService } from './portfolio-details.service';
import { PortfolioDetailsController } from './portfolio-details.controller';

@Module({
  controllers: [PortfolioDetailsController],
  providers: [PortfolioDetailsService],
})
export class PortfolioDetailsModule {}
