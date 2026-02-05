import { Module } from '@nestjs/common';
import { ServiceFaqsService } from './service-faqs.service';
import { ServiceFaqsController } from './service-faqs.controller';
import { ServiceFaq } from './entities/service-faq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceFaq, Service])],
  controllers: [ServiceFaqsController],
  providers: [ServiceFaqsService],
  exports: [ServiceFaqsService],
})
export class ServiceFaqsModule {}
