import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { PaginationQueryDto } from 'src/common/data-query/dto/data-query.dto';

/**
 * Base DTO for filtering Team members
 */
class GetTeamBaseDto {
  @ApiPropertyOptional({
    description: 'Filter by team member name (partial match)',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by team member designation or role (partial match)',
    example: 'Senior Software Engineer',
  })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

/**
 * DTO for fetching Team members with pagination
 */
export class GetTeamDto extends IntersectionType(
  GetTeamBaseDto,
  PaginationQueryDto,
) {}
