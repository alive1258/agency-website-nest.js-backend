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
import { OurWorkProcessService } from './our-work-process.service';
import {
  CreateOurWorkProcessDto,
  OurWorkProcessResponseDto,
} from './dto/create-our-work-process.dto';
import { UpdateOurWorkProcessDto } from './dto/update-our-work-process.dto';
import { GetOurWorkProcessDto } from './dto/get-our-work-process.dto';
import { ApiDoc } from 'src/auth/decorators/swagger.decorator';
import { JwtOrApiKeyGuard } from 'src/auth/guards/jwt-or-api-key.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission-type.enum';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('our-work-process')
export class OurWorkProcessController {
  constructor(private readonly ourWorkProcessService: OurWorkProcessService) {}

  @ApiDoc({
    summary: 'Create Our Work Process',
    description: 'Creates a new work process. Requires proper permission.',
    response: OurWorkProcessResponseDto,
    status: HttpStatus.OK,
  })
  @RequirePermissions(Permission.OUR_WORK_PROCESSES_CREATE)
  @UseGuards(JwtOrApiKeyGuard, PermissionsGuard)
  @Throttle({ default: { limit: 20, ttl: 180 } })
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  create(
    @Req() req: Request,
    @Body() createOurWorkProcessDto: CreateOurWorkProcessDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.ourWorkProcessService.create(
      req,
      createOurWorkProcessDto,
      file,
    );
  }

  @ApiDoc({
    summary: 'Get all Our Work Processes',
    description: 'Retrieves all work processes with pagination and filters.',
    response: OurWorkProcessResponseDto,
    status: HttpStatus.OK,
  })
  @Get()
  findAll(@Query() query: GetOurWorkProcessDto) {
    return this.ourWorkProcessService.findAll(query);
  }

  @ApiDoc({
    summary: 'Get single Our Work Process',
    description: 'Retrieve a single work process by UUID.',
    response: OurWorkProcessResponseDto,
    status: HttpStatus.OK,
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ourWorkProcessService.findOne(id);
  }

  @ApiDoc({
    summary: 'Update Our Work Process',
    description:
      'Updates an existing work process. Requires proper permission.',
    response: OurWorkProcessResponseDto,
    status: HttpStatus.OK,
  })
  @RequirePermissions(Permission.OUR_WORK_PROCESSES_UPDATE)
  @UseGuards(JwtOrApiKeyGuard, PermissionsGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Throttle({ default: { limit: 20, ttl: 180 } })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOurWorkProcessDto: UpdateOurWorkProcessDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.ourWorkProcessService.update(id, updateOurWorkProcessDto, file);
  }

  @ApiDoc({
    summary: 'Delete Our Work Process',
    description: 'Soft deletes a work process. Requires proper permission.',
    response: OurWorkProcessResponseDto,
    status: HttpStatus.OK,
  })
  @RequirePermissions(Permission.OUR_WORK_PROCESSES_DELETE)
  @UseGuards(JwtOrApiKeyGuard, PermissionsGuard)
  @Throttle({ default: { limit: 20, ttl: 180 } })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ourWorkProcessService.remove(id);
  }
}
