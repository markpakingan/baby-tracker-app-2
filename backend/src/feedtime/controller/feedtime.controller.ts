import { Controller, Logger, Body, Query, Post, Get, Patch} from '@nestjs/common';
import { FeedtimeService } from '../service/feedtime.service';
import { CreateFeedTimeDto } from '../dto/createFeedTime.dto';
import { UpdateFeedTimeResponse } from '../dto/updateFeedTime.dto';

@Controller('feedtime')
export class FeedtimeController {
    
    private readonly logger = new Logger(FeedtimeController.name);
    constructor(private readonly feedTimeService: FeedtimeService){}


    @Post('/create')
    async createFeedTime(
    
        @Body() createFeedTimeDto: CreateFeedTimeDto
    ){

        try{

            return this.feedTimeService.create(createFeedTimeDto)

        }catch(error){
            console.error('error creating feedtime', error)
            this.logger.error(FeedtimeController.name, error);
            throw error
        }
    }

    @Get('/getall')
    async getAllFeedTime(
        @Query('page') page: number, 
        @Query('size') size: number, 
        @Query('order') order: string
  ){

        try{
            return this.feedTimeService.getAll(page, size, order)

        }catch(error){
            this.logger.error(FeedtimeController.name, error)
            throw error;
        }
    }


    @Get('/getone')
    async getOneFeedTime(
        @Query('id') feedtime_id: number
  ){

        try{
            return this.feedTimeService.getOne(feedtime_id)

        }catch(error){
            this.logger.error(FeedtimeController.name, error)
            throw error;
        }
    }

    @Patch('/update')
    async UpdateFeedTime(
        @Query('id') feedtime_id : number,
        @Body() updateFeedTimeResponse: UpdateFeedTimeResponse
  ){

        try{
            return this.feedTimeService.update(feedtime_id, updateFeedTimeResponse)

        }catch(error){
            this.logger.error(FeedtimeController.name, error)
            throw error;
        }
    }

}
