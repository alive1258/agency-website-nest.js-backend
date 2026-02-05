import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/data-query/dto/data-query.dto';

class GetServiceWorkFlowBaseDto {
  @ApiPropertyOptional({
    description: 'Filter service workflows by title (partial match supported).',
    example: 'Requirement Analysis',
  })
  @IsOptional()
  @IsString({ message: 'Title must be a string.' })
  title?: string;

  @ApiPropertyOptional({
    description:
      'Filter service workflows by description (partial match supported).',
    example: 'We analyze client requirements and define project scope.',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'is_active must be a boolean value.' })
  is_active?: boolean;
}

export class GetServiceWorkFlowDto extends IntersectionType(
  GetServiceWorkFlowBaseDto,
  PaginationQueryDto,
) {}
