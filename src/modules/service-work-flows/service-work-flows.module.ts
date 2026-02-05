import { Module } from '@nestjs/common';
import { ServiceWorkFlowsService } from './service-work-flows.service';
import { ServiceWorkFlowsController } from './service-work-flows.controller';
import { ServiceWorkFlow } from './entities/service-work-flow.entity';
import { Service } from '../services/entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceWorkFlow, Service])],
  controllers: [ServiceWorkFlowsController],
  providers: [ServiceWorkFlowsService],
  exports: [ServiceWorkFlowsService],
})
export class ServiceWorkFlowsModule {}
