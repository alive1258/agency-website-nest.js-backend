import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  ParseUUIDPipe,
  HttpStatus,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto, TeamResponseDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { GetTeamDto } from './dto/get-team.dto';
import { ApiDoc } from 'src/auth/decorators/swagger.decorator';
import { JwtOrApiKeyGuard } from 'src/auth/guards/jwt-or-api-key.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission-type.enum';
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiDoc({
    summary: 'Create Team Member',
    description: 'Creates a new team member entry. Requires proper permission.',
    response: TeamResponseDto,
    status: HttpStatus.OK,
  })
  @RequirePermissions(Permission.TEAM_CREATE)
  @UseGuards(JwtOrApiKeyGuard, PermissionsGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Throttle({ default: { limit: 20, ttl: 180 } })
  @Post('create')
  create(
    @Req() req: Request,
    @Body() createTeamDto: CreateTeamDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.teamsService.create(req, createTeamDto, file);
  }

  @ApiDoc({
    summary: 'Get all Team Members',
    description: 'Retrieves all team members. Supports pagination and filters.',
    response: TeamResponseDto,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtOrApiKeyGuard)
  @Get()
  findAll(@Query() query: GetTeamDto) {
    return this.teamsService.findAll(query);
  }

  @ApiDoc({
    summary: 'Get Single Team Member',
    description: 'Retrieve a single team member by UUID.',
    response: TeamResponseDto,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtOrApiKeyGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.findOne(id);
  }

  @ApiDoc({
    summary: 'Update Team Member',
    description:
      'Updates an existing team member entry. Requires proper permission.',
    response: TeamResponseDto,
    status: HttpStatus.OK,
  })
  @RequirePermissions(Permission.TEAM_UPDATE)
  @UseGuards(JwtOrApiKeyGuard, PermissionsGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Throttle({ default: { limit: 20, ttl: 180 } })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.teamsService.update(id, updateTeamDto, file);
  }

  @ApiDoc({
    summary: 'Delete Team Member',
    description:
      'Soft deletes a team member entry. Requires proper permission.',
    response: TeamResponseDto,
    status: HttpStatus.OK,
  })
  @RequirePermissions(Permission.TEAM_DELETE)
  @UseGuards(JwtOrApiKeyGuard, PermissionsGuard)
  @Throttle({ default: { limit: 20, ttl: 180 } })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.remove(id);
  }
}
