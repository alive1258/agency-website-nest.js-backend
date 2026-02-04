import { Injectable } from '@nestjs/common';
import { CreatePortfolioDetailDto } from './dto/create-portfolio-detail.dto';
import { UpdatePortfolioDetailDto } from './dto/update-portfolio-detail.dto';

@Injectable()
export class PortfolioDetailsService {
  create(createPortfolioDetailDto: CreatePortfolioDetailDto) {
    return 'This action adds a new portfolioDetail';
  }

  findAll() {
    return `This action returns all portfolioDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolioDetail`;
  }

  update(id: number, updatePortfolioDetailDto: UpdatePortfolioDetailDto) {
    return `This action updates a #${id} portfolioDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolioDetail`;
  }
}
