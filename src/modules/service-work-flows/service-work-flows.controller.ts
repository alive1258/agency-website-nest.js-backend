import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import type { Request } from 'express';

import { ServiceWorkFlowsService } from './service-work-flows.service';

import {
  CreateServiceWorkFlowDto,
  ServiceWorkFlowResponseDto,
} from './dto/create-service-work-flow.dto';
import { UpdateServiceWorkFlowDto } from './dto/update-service-work-flow.dto';
import { GetServiceWorkFlowDto } from './dto/get-service-work-flow.dto';

import { ApiDoc } from 'src/auth/decorators/swagger.decorator';
import { JwtOrApiKeyGuard } from 'src/auth/guards/jwt-or-api-key.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission-type.enum';

@Controller('service-work-flows')
export class ServiceWorkFlowsController {
  constructor(
    private readonly serviceWorkFlowsService: ServiceWorkFlowsService,
  ) {}

  // ===============================
  // Create Service Workflow
  // ===============================
  @ApiDoc({
    summary: 'Create Service Workflow',
    description: 'Creates a new Service Workflow. Requires proper permission.',
    response: ServiceWorkFlowResponseDto,
    status: HttpStatus.OK,
  })
  @RequirePermissions(Permission.SERVICE_WORK_FLOW_CREATE)
  @UseGuards(JwtOrApiKeyGuard, PermissionsGuard)
  @Post('create')
  create(
    @Req() req: Request,
    @Body() createServiceWorkFlowDto: CreateServiceWorkFlowDto,
  ) {
    return this.serviceWorkFlowsService.create(req, createServiceWorkFlowDto);
  }

  // ===============================
  // Get All Service Workflows
  // ===============================
  @ApiDoc({
    summary: 'Get all Service Workflows',
    description: 'Retrieves all Service Workflows with pagination & filters.',
    response: ServiceWorkFlowResponseDto,
    status: HttpStatus.OK,
  })
  @Get()
  findAll(@Query() query: GetServiceWorkFlowDto) {
    return this.serviceWorkFlowsService.findAll(query);
  }

  // ===============================
  // Get Single Service Workflow
  // ===============================
  @ApiDoc({
    summary: 'Get single Service Workflow',
    description: 'Retrieves a Service Workflow by UUID.',
    response: ServiceWorkFlowResponseDto,
    status: HttpStatus.OK,
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceWorkFlowsService.findOne(id);
  }

  // ===============================
  // Update Service Workflow
  // ===============================
  @ApiDoc({
    summary: 'Update Service Workflow',
    description:
      'Updates an existing Service Workflow. Requires proper permission.',
    response: ServiceWorkFlowResponseDto,
    status: HttpStatus.OK,
  })
  @RequirePermissions(Permission.SERVICE_WORK_FLOW_UPDATE)
  @UseGuards(JwtOrApiKeyGuard, PermissionsGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceWorkFlowDto: UpdateServiceWorkFlowDto,
  ) {
    return this.serviceWorkFlowsService.update(id, updateServiceWorkFlowDto);
  }

  // ===============================
  // Delete (Soft) Service Workflow
  // ===============================
  @ApiDoc({
    summary: 'Delete Service Workflow',
    description: 'Soft deletes a Service Workflow. Requires proper permission.',
    response: ServiceWorkFlowResponseDto,
    status: HttpStatus.OK,
  })
  @RequirePermissions(Permission.SERVICE_WORK_FLOW_DELETE)
  @UseGuards(JwtOrApiKeyGuard, PermissionsGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceWorkFlowsService.remove(id);
  }
}
