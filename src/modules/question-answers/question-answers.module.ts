import { Module } from '@nestjs/common';
import { QuestionAnswersService } from './question-answers.service';
import { QuestionAnswersController } from './question-answers.controller';
import { QuestionAnswer } from './entities/question-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionAnswer])],
  controllers: [QuestionAnswersController],
  providers: [QuestionAnswersService],
  exports: [QuestionAnswersService],
})
export class QuestionAnswersModule {}
