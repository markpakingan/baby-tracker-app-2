import { Controller, Get, Query} from '@nestjs/common';
import { ActivityService } from './activities.service';

@Controller('activities')
export class ActivitiesController {

    constructor(private readonly activityService: ActivityService){}


    // @UseGuards(AuthGuard)
    @Get('recent')
    async getRecentActivities(
        @Query('id') userId: number
    ){
        return this.activityService.getLastActivities(userId)

    }
}


// /testing