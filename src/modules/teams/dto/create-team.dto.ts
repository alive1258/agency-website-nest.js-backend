import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    description: 'Team member full name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Team member designation or role',
    example: 'Senior Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty({
    description: 'Profile image URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'LinkedIn profile URL',
    example: 'https://linkedin.com/in/johndoe',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  linkedin_url?: string;

  @ApiProperty({
    description: 'Portfolio website URL',
    example: 'https://johndoe.dev',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  portfolio_url?: string;

  @ApiProperty({
    description: 'Facebook profile URL',
    example: 'https://facebook.com/johndoe',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  facebook_url?: string;
}

export class TeamResponseDto {
  @ApiProperty({ description: 'Team UUID' })
  id: string;

  @ApiProperty({ description: 'Team member name' })
  name: string;

  @ApiProperty({ description: 'Team member designation' })
  designation: string;

  @ApiProperty({
    description: 'Profile image URL',
    required: false,
  })
  image?: string;

  @ApiProperty({
    description: 'LinkedIn profile URL',
    required: false,
  })
  linkedin_url?: string;

  @ApiProperty({
    description: 'Portfolio website URL',
    required: false,
  })
  portfolio_url?: string;

  @ApiProperty({
    description: 'Facebook profile URL',
    required: false,
  })
  facebook_url?: string;

  @ApiProperty({
    description: 'User who added the team member',
    required: false,
  })
  addedBy?: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
  };

  @ApiProperty({ description: 'Creation timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updated_at: Date;

  @ApiProperty({
    description: 'Soft delete timestamp',
    required: false,
    example: '2025-01-01T00:00:00.000Z',
  })
  deleted_at?: Date;
}
