import { PartialType } from '@nestjs/swagger';
import { CreatePortfolioCategoryDto } from './create-portfolio-category.dto';

export class UpdatePortfolioCategoryDto extends PartialType(CreatePortfolioCategoryDto) {}
