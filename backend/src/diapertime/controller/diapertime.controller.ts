import { Controller, Post, Get, Patch, Query, Body, Logger } from '@nestjs/common';
import { DiapertimeService } from '../service/diapertime.service';
import { CreateDiaperTimeDto } from '../dto/createDiaperTime.dto';
import { UpdateDiaperTimeResponse } from '../dto/updateDiaperTimeResponse.dto';

@Controller('diapertime')
export class DiapertimeController {
    private readonly logger = new Logger(DiapertimeController.name);
    constructor(private readonly diaperTimeService: DiapertimeService){}


    @Post('/create')
    async createDiaperTime(
    
        @Body() createDiaperTimeDto: CreateDiaperTimeDto
    ){

        try{

            return this.diaperTimeService.create(createDiaperTimeDto)

        }catch(error){
            console.error('error creating data for diapers', error)
            this.logger.error(DiapertimeController.name, error);
            throw error
        }
    }

    @Get('/getall')
    async getAllDiaperTime(
        @Query('page') page: number, 
        @Query('size') size: number, 
        @Query('order') order: string
  ){

        try{
            return this.diaperTimeService.getAll(page, size, order)

        }catch(error){
            this.logger.error(DiapertimeController.name, error)
            throw error;
        }
    }


    @Get('/getone')
    async getOneDiaperTime(
        @Query('id') diapertime_id: number
  ){

        try{
            return this.diaperTimeService.getOne(diapertime_id)

        }catch(error){
            this.logger.error(DiapertimeService.name, error)
            throw error;
        }
    }

    @Patch('/update')
    async UpdateDiaperTime(
        @Query('id') diaperTimeId : number,
        @Body() updateDiaperTimeResponse: UpdateDiaperTimeResponse
  ){

        try{
            return this.diaperTimeService.update(diaperTimeId, updateDiaperTimeResponse)

        }catch(error){
            this.logger.error(DiapertimeController.name, error)
            throw error;
        }
    }

}
