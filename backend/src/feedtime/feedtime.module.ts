import { Module } from '@nestjs/common';
import { FeedtimeController } from './controller/feedtime.controller';
import { FeedtimeService } from './service/feedtime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedTimeEntity } from './feedtime.entity';
import { BabyEntity } from 'src/baby/baby.entity';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedTimeEntity, BabyEntity, UserEntity])],
  controllers: [FeedtimeController],
  providers: [FeedtimeService]
})  
export class FeedtimeModule {}
