import { PartialType } from '@nestjs/swagger';
import { CreatePortfolioDetailDto } from './create-portfolio-detail.dto';

export class UpdatePortfolioDetailDto extends PartialType(CreatePortfolioDetailDto) {}
