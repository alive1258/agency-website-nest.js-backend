import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/data-query/dto/data-query.dto';

class GetPortfolioCategoryBaseDto {
  @ApiPropertyOptional({
    description: 'Filter categories by name.',
    example: 'Technology',
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  name?: string;
}

export class GetPortfolioCategoryDto extends IntersectionType(
  GetPortfolioCategoryBaseDto,
  PaginationQueryDto,
) {}
