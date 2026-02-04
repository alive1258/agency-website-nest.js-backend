import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortfolioCategoriesService } from './portfolio-categories.service';
import { CreatePortfolioCategoryDto } from './dto/create-portfolio-category.dto';
import { UpdatePortfolioCategoryDto } from './dto/update-portfolio-category.dto';

@Controller('portfolio-categories')
export class PortfolioCategoriesController {
  constructor(private readonly portfolioCategoriesService: PortfolioCategoriesService) {}

  @Post()
  create(@Body() createPortfolioCategoryDto: CreatePortfolioCategoryDto) {
    return this.portfolioCategoriesService.create(createPortfolioCategoryDto);
  }

  @Get()
  findAll() {
    return this.portfolioCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortfolioCategoryDto: UpdatePortfolioCategoryDto) {
    return this.portfolioCategoriesService.update(+id, updatePortfolioCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioCategoriesService.remove(+id);
  }
}
