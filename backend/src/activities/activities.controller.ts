import { Controller, Get, Query, Delete, Param} from '@nestjs/common';
import { ActivityService } from './activities.service';

@Controller('activities')
export class ActivitiesController {

    constructor(private readonly activityService: ActivityService){}


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

    @Delete(':id')
    async deleteActivities(
        @Param('id') id: number){
            return this.activityService.deleteOneActivitiy(id)
        }
    
}


