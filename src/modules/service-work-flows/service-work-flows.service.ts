import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Request } from 'express';

import { ServiceWorkFlow } from './entities/service-work-flow.entity';
import {
  CreateServiceWorkFlowDto,
  ServiceWorkFlowResponseDto,
} from './dto/create-service-work-flow.dto';
import { UpdateServiceWorkFlowDto } from './dto/update-service-work-flow.dto';
import { GetServiceWorkFlowDto } from './dto/get-service-work-flow.dto';

import { IPagination } from 'src/common/data-query/pagination.interface';
import { DataQueryService } from 'src/common/data-query/data-query.service';

@Injectable()
export class ServiceWorkFlowsService {
  constructor(
    @InjectRepository(ServiceWorkFlow)
    private readonly serviceWorkFlowRepository: Repository<ServiceWorkFlow>,
    private readonly dataQueryService: DataQueryService,
  ) {}

  /**
   * Create Service Workflow
   */
  public async create(
    req: Request,
    createDto: CreateServiceWorkFlowDto,
  ): Promise<ServiceWorkFlow> {
    const userId = req?.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('Authentication required.');
    }

    createDto.title = createDto.title.trim();

    const exists = await this.serviceWorkFlowRepository.exists({
      where: {
        title: createDto.title,
      },
    });

    if (exists) {
      throw new BadRequestException(
        'Workflow with this title already exists for this service.',
      );
    }

    const workflow = this.serviceWorkFlowRepository.create({
      ...createDto,
      added_by: String(userId),
    });

    return this.serviceWorkFlowRepository.save(workflow);
  }

  /**
   * Get all Service Workflows (pagination + filters)
   */
  public async findAll(
    query: GetServiceWorkFlowDto,
  ): Promise<IPagination<Partial<ServiceWorkFlowResponseDto>>> {
    return this.dataQueryService.execute<Partial<ServiceWorkFlowResponseDto>>({
      repository: this.serviceWorkFlowRepository,
      alias: 'serviceWorkFlow',
      pagination: query,
      searchableFields: ['title', 'description'],
      filterableFields: ['service_id', 'is_active'],
      relations: ['addedBy', 'service'],
      select: [
        'id',
        'title',
        'description',
        'is_active',
        'service_id',
        'created_at',
        'updated_at',
      ],
    });
  }

  /**
   * Get single Service Workflow by UUID
   */
  public async findOne(id: string) {
    const workflow = await this.serviceWorkFlowRepository.findOne({
      where: { id },
      relations: ['addedBy', 'service'],
    });

    if (!workflow) {
      throw new NotFoundException('Service Workflow not found.');
    }

    return {
      id: workflow.id,
      title: workflow.title,
      description: workflow.description,
      is_active: workflow.is_active,
      service: workflow.service
        ? {
            id: workflow.service.id,
            name: workflow.service.name,
          }
        : undefined,
      addedBy: workflow.addedBy
        ? {
            id: workflow.addedBy.id,
            name: workflow.addedBy.name,
          }
        : undefined,
      created_at: workflow.created_at,
      updated_at: workflow.updated_at,
    };
  }

  /**
   * Update Service Workflow
   */
  public async update(
    id: string,
    updateDto: UpdateServiceWorkFlowDto,
  ): Promise<ServiceWorkFlow> {
    const workflow = await this.serviceWorkFlowRepository.findOne({
      where: { id },
    });

    if (!workflow) {
      throw new NotFoundException('Service Workflow not found.');
    }

    if (updateDto.title) {
      updateDto.title = updateDto.title.trim();

      const exists = await this.serviceWorkFlowRepository.exists({
        where: {
          title: updateDto.title,
          service_id: workflow.service_id,
          id: Not(id),
        },
      });

      if (exists) {
        throw new BadRequestException(
          'Workflow with this title already exists for this service.',
        );
      }
    }

    Object.assign(workflow, updateDto);
    return this.serviceWorkFlowRepository.save(workflow);
  }

  /**
   * Soft delete Service Workflow
   */
  public async remove(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('ID is required.');
    }

    const workflow = await this.serviceWorkFlowRepository.findOne({
      where: { id },
    });

    if (!workflow) {
      throw new NotFoundException('Service Workflow not found.');
    }

    const result = await this.serviceWorkFlowRepository.softDelete(id);

    if (!result.affected) {
      throw new BadRequestException(
        'Delete failed: record might already be removed.',
      );
    }
  }
}
