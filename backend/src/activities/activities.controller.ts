import { Controller, Get, Query, Delete, Param} from '@nestjs/common';
import { ActivityService } from './activities.service';
import { NapTimeService } from 'src/naptime/service/naptime.service';
import { FeedtimeService } from 'src/feedtime/service/feedtime.service';
import { DiapertimeService } from 'src/diapertime/service/diapertime.service';

@Controller('activities')
export class ActivitiesController {

    constructor(
        private readonly activityService: ActivityService,
        private readonly napTimeService: NapTimeService,
        private readonly feedTimeService: FeedtimeService,
        private readonly diaperTimeService: DiapertimeService){}


    // @UseGuards(AuthGuard)
    @Get('/recent')
    async getRecentActivities(
        @Query('id') userId: number
    ){
        return this.activityService.getLastActivities(userId)

    }


    @Get('/daily')
    async getDailyActivities(
        @Query('id') userId: number
    ){
        return this.activityService.getTopTenRecentActivities(userId)
    }

    // @Delete('/type')
    // async deleteActivities(
    //     @Param('type') type:string,
    //     @Query('id') userId: number){

    //         switch(type){
    //             case 'naptime':
    //                 return this.naptimeRepo.delete(id);
    //         }
                
            
    //     }
    
}


