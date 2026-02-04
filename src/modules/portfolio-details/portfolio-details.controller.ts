import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortfolioDetailsService } from './portfolio-details.service';
import { CreatePortfolioDetailDto } from './dto/create-portfolio-detail.dto';
import { UpdatePortfolioDetailDto } from './dto/update-portfolio-detail.dto';

@Controller('portfolio-details')
export class PortfolioDetailsController {
  constructor(private readonly portfolioDetailsService: PortfolioDetailsService) {}

  @Post()
  create(@Body() createPortfolioDetailDto: CreatePortfolioDetailDto) {
    return this.portfolioDetailsService.create(createPortfolioDetailDto);
  }

  @Get()
  findAll() {
    return this.portfolioDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortfolioDetailDto: UpdatePortfolioDetailDto) {
    return this.portfolioDetailsService.update(+id, updatePortfolioDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioDetailsService.remove(+id);
  }
}
