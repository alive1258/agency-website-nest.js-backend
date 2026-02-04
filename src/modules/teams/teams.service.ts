import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Request } from 'express';
import { Team } from './entities/team.entity';
import { CreateTeamDto, TeamResponseDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { GetTeamDto } from './dto/get-team.dto';
import { IPagination } from 'src/common/data-query/pagination.interface';
import { DataQueryService } from 'src/common/data-query/data-query.service';
import { FileUploadsService } from 'src/common/file-uploads/file-uploads.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
    private readonly fileUploadsService: FileUploadsService,
    private readonly dataQueryService: DataQueryService,
  ) {}

  /**
   * Create Team Member (WITH IMAGE)
   */
  async create(
    req: Request,
    createDto: CreateTeamDto,
    file?: Express.Multer.File,
  ): Promise<Team> {
    const userId = req?.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('Authentication required.');
    }

    createDto.name = createDto.name.trim();

    const exists = await this.teamRepo.exists({
      where: { name: createDto.name },
    });
    if (exists) {
      throw new BadRequestException(
        'Team member with this name already exists.',
      );
    }

    let imageUrl: string | undefined;
    if (file) {
      const uploadedFiles = await this.fileUploadsService.fileUploads([file]);
      imageUrl = uploadedFiles[0];
    }

    const team = this.teamRepo.create({
      ...createDto,
      added_by: String(userId),
      image: imageUrl,
    });

    return this.teamRepo.save(team);
  }

  /**
   * Get all Team Members (pagination + filters)
   */
  async findAll(
    query: GetTeamDto,
  ): Promise<IPagination<Partial<TeamResponseDto>>> {
    return this.dataQueryService.execute<Partial<TeamResponseDto>>({
      repository: this.teamRepo,
      alias: 'team',
      pagination: query,
      searchableFields: ['name', 'designation'],
      relations: ['addedBy'],
      select: [
        'id',
        'name',
        'designation',
        'image',
        'linkedin_url',
        'portfolio_url',
        'facebook_url',
        'created_at',
        'updated_at',
      ],
    });
  }

  /**
   * Get single Team Member by UUID
   */
  async findOne(id: string): Promise<TeamResponseDto> {
    const team = await this.teamRepo.findOne({
      where: { id },
      relations: ['addedBy'],
    });

    if (!team) throw new NotFoundException('Team member not found.');

    return {
      id: team.id,
      name: team.name,
      designation: team.designation,
      image: team.image,
      linkedin_url: team.linkedin_url,
      portfolio_url: team.portfolio_url,
      facebook_url: team.facebook_url,
      addedBy: team.addedBy
        ? {
            id: team.addedBy.id,
            name: team.addedBy.name,
          }
        : undefined,
      created_at: team.created_at,
      updated_at: team.updated_at,
    };
  }

  /**
   * Update Team Member (WITH IMAGE)
   */
  async update(
    id: string,
    updateDto: UpdateTeamDto,
    file?: Express.Multer.File,
  ): Promise<Team> {
    const team = await this.teamRepo.findOne({ where: { id } });
    if (!team) throw new NotFoundException('Team member not found.');

    if (updateDto.name) {
      updateDto.name = updateDto.name.trim();

      const exists = await this.teamRepo.exists({
        where: { name: updateDto.name, id: Not(id) },
      });
      if (exists) {
        throw new BadRequestException(
          'Team member with this name already exists.',
        );
      }
    }

    if (file) {
      if (team.image) {
        const updatedImage = await this.fileUploadsService.updateFileUploads({
          oldFile: team.image,
          currentFile: file,
        });
        updateDto.image = updatedImage as string;
      } else {
        const uploadedFiles = await this.fileUploadsService.fileUploads([file]);
        updateDto.image = uploadedFiles[0];
      }
    }

    Object.assign(team, updateDto);
    return this.teamRepo.save(team);
  }

  /**
   * Soft Delete Team Member (WITH IMAGE DELETE)
   */
  async remove(id: string): Promise<void> {
    const team = await this.teamRepo.findOne({ where: { id } });
    if (!team) throw new NotFoundException('Team member not found.');

    if (team.image) {
      try {
        await this.fileUploadsService.deleteFileUploads(team.image);
      } catch (err) {
        console.warn(`Failed to delete team image: ${err.message}`);
      }
    }

    const result = await this.teamRepo.softDelete(id);
    if (!result.affected) {
      throw new BadRequestException(
        'Delete failed: record might already be removed.',
      );
    }
  }
}
