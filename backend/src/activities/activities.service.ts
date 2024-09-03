// 

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NapTimeEntity } from '../naptime/naptime.entity';
import { FeedTimeEntity } from 'src/feedtime/feedtime.entity';
// Import DiaperTimeEntity if applicable
import { DiaperTimeEntity } from 'src/diapertime/diapertime.entity'; // Assuming you have this entity

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(NapTimeEntity)
    private readonly naptimeRepo: Repository<NapTimeEntity>,
    
    @InjectRepository(FeedTimeEntity)
    private readonly feedTimeRepo: Repository<FeedTimeEntity>,

    @InjectRepository(DiaperTimeEntity)
    private readonly diaperTimeRepo: Repository<DiaperTimeEntity>, // Add this line if applicable
  ) {}

  async getLastActivities(userId: number) {
    
    // Get the last naptime activity
    const lastNaptimeActivity = await this.naptimeRepo.findOne({
      where: {user: { id: userId }},
      relations: ['babies', 'user'],
      order: { id: 'DESC' }
    });

    // Get the last feeding time activity
    const lastFeedingTimeActivity = await this.feedTimeRepo.findOne({
      where: { user: { id: userId } },
      relations: ['babies', 'user'],
      order: { id: 'DESC' }
    });

    // Get the last diaper time activity (if applicable)
    const lastDiaperTimeActivity = await this.diaperTimeRepo.findOne({
      where: { user: { id: userId } },
      relations: ['babies', 'user'],
      order: { id: 'DESC' }
    });

    const activities = [];

    if (lastNaptimeActivity) {
      activities.push({
        id: lastNaptimeActivity.id,
        type: 'Naptime',
        date: lastNaptimeActivity.date,
        babyId: lastNaptimeActivity.babies.id,
        userId: lastNaptimeActivity.user.id
      });
    }

    if (lastFeedingTimeActivity) {
      activities.push({
        id: lastFeedingTimeActivity.id,
        type: 'FeedingTime',
        date: lastFeedingTimeActivity.date,
        babyId: lastFeedingTimeActivity.babies.id,
        userId: lastFeedingTimeActivity.user.id
      });
    }

    if (lastDiaperTimeActivity) {
      activities.push({
        id: lastDiaperTimeActivity.id,
        type: 'DiaperTime',
        date: lastDiaperTimeActivity.date,
        babyId: lastDiaperTimeActivity.babies.id,
        userId: lastDiaperTimeActivity.user.id
      });
    }

    // Sort activities by date in descending order
    // activities.sort((a, b) => b.date.getTime() - a.date.getTime());
    

    return activities;

  }

  async getTopTenRecentActivities(userId:number){

      // Get the last naptime activity
    const lastNaptimeActivity = await this.naptimeRepo.find({
      where: {user: { id: userId }},
      relations: ['babies', 'user'],
      order: { id: 'DESC' }, 
      take: 10
    });

    // Get the last feeding time activity
    const lastFeedingTimeActivity = await this.feedTimeRepo.find({
      where: { user: { id: userId } },
      relations: ['babies', 'user'],
      order: { id: 'DESC' }, 
      take: 10
    });

    // Get the last diaper time activity (if applicable)
    const lastDiaperTimeActivity = await this.diaperTimeRepo.find({
      where: { user: { id: userId } },
      relations: ['babies', 'user'],
      order: { id: 'DESC' }, 
      take: 10
    });

    const activities = [];

      // Check and push each naptime activity into the activities array
  if (lastNaptimeActivity.length > 0) {
    lastNaptimeActivity.forEach((activity) => {
      activities.push({
        id: activity.id,
        type: 'Naptime',
        date: activity.date,
        babyId: activity.babies.id,
        userId: activity.user.id,
      });
    });
  }

  // Check and push each feeding time activity into the activities array
  if (lastFeedingTimeActivity.length > 0) {
    lastFeedingTimeActivity.forEach((activity) => {
      activities.push({
        id: activity.id,
        type: 'FeedingTime',
        date: activity.date,
        babyId: activity.babies.id,
        userId: activity.user.id,
      });
    });
  }

  // Check and push each diaper time activity into the activities array
  if (lastDiaperTimeActivity.length > 0) {
    lastDiaperTimeActivity.forEach((activity) => {
      activities.push({
        id: activity.id,
        type: 'DiaperTime',
        date: activity.date,
        babyId: activity.babies.id,
        userId: activity.user.id,
      });
    });
  }

  return activities;
  }


}
