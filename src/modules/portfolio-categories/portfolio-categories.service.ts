import { Injectable } from '@nestjs/common';
import { CreatePortfolioCategoryDto } from './dto/create-portfolio-category.dto';
import { UpdatePortfolioCategoryDto } from './dto/update-portfolio-category.dto';

@Injectable()
export class PortfolioCategoriesService {
  create(createPortfolioCategoryDto: CreatePortfolioCategoryDto) {
    return 'This action adds a new portfolioCategory';
  }

  findAll() {
    return `This action returns all portfolioCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolioCategory`;
  }

  update(id: number, updatePortfolioCategoryDto: UpdatePortfolioCategoryDto) {
    return `This action updates a #${id} portfolioCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolioCategory`;
  }
}
