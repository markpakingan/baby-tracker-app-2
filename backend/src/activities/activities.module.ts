import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaperTimeEntity } from 'src/diapertime/diapertime.entity';
import { FeedTimeEntity } from 'src/feedtime/feedtime.entity';
import { NapTimeEntity } from 'src/naptime/naptime.entity';
import { ActivityService } from './activities.service';
import { ActivitiesController } from './activities.controller';

@Module({
imports: [TypeOrmModule.forFeature([NapTimeEntity, FeedTimeEntity, DiaperTimeEntity])],
  providers: [ActivityService],
  controllers: [ActivitiesController]
})
export class ActivitiesModule {
    
}
