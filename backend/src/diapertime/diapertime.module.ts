import { Module } from '@nestjs/common';
import { DiapertimeService } from './service/diapertime.service';
import { DiapertimeController } from './controller/diapertime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaperTimeEntity } from './diapertime.entity';
import { BabyEntity } from 'src/baby/baby.entity';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaperTimeEntity, BabyEntity, UserEntity])],
  providers: [DiapertimeService],
  controllers: [DiapertimeController]
})
export class DiaperTimeModule {}
