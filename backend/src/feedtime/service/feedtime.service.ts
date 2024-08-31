import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedTimeEntity } from '../feedtime.entity';
import { UserEntity } from 'src/user/user.entity';
import { BabyEntity } from 'src/baby/baby.entity';
import { Repository } from 'typeorm';
import { CreateFeedTimeDto } from '../dto/createFeedTime.dto';
import { GetOneFeedTimeDto } from '../dto/getOneFeedTime.dto';

@Injectable()
export class FeedtimeService {
    constructor(
        @InjectRepository(FeedTimeEntity)
        private readonly feedTimeRepo: Repository<FeedTimeEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepo : Repository<UserEntity>,

        @InjectRepository(BabyEntity)
        private readonly babyRepo : Repository<BabyEntity>



    ){}


    async create(
        createFeedTimeDto: CreateFeedTimeDto
    ){

        //checks if user is existing
        const existingUser = await this.userRepo.findOneBy({id: createFeedTimeDto.userId})
        if(!existingUser){
            throw new NotFoundException({
                status: "Error", 
                message: "UserID not found!"
            })
        }


        //checks if a babyId matches UserId
        const matchedBaby = await this.babyRepo.findOne({
            where: {
                id: createFeedTimeDto.babyId,
                user: existingUser
            }
        })


        if(!matchedBaby){
            throw new NotFoundException({
                status: "error",
                message: "baby does not belong to the specified user"
            })
        }
        // Save to feedtime entity
        const newFeedTime = new FeedTimeEntity;

        newFeedTime.date = new Date(createFeedTimeDto.date);
        newFeedTime.babies = matchedBaby;
        newFeedTime.user = existingUser; 
        await this.feedTimeRepo.save(newFeedTime)

        return{
            status: "OK",
            message: "New feedtime created successfully", 
            data: {
                date: createFeedTimeDto.date,
                babyId: createFeedTimeDto.babyId,
                userId: createFeedTimeDto.userId

            }
        }
    }



    async getAll(
        page: number, 
        size: number, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        order: string
    ){
        const take = size || 5 
        const skip = (page - 1) * take; 

        const data = await this.feedTimeRepo.findAndCount({
            take, 
            skip, 
            order:{
                id: 'ASC'
            }, 
            relations: ['babies', 'user'],
        })

        const [result, total] = data
        const lastPage = Math.ceil(total/ Number(size))


        const info = result.map((feedTime: FeedTimeEntity)=> {

            const dto = new FeedTimeEntity; 

            dto.date = feedTime.date;
            dto.babies = feedTime.babies; 
            dto.user = feedTime.user; 

            return dto
        })


        return{
            count: total, 
            rows: info, 
            cpage: Number(page),
            tpage: lastPage
        }

    }


    async getOne(
        feedtime_id: number
    ){

        const existingFeedTimeId = await this.feedTimeRepo.findOne({
            where: {id: feedtime_id},
            relations: ['babies', 'user']
    })

        if(!existingFeedTimeId){
            throw new NotFoundException({
                status: "error", 
                message: "Feed time not found!"
            })
        }

        const response = new GetOneFeedTimeDto()

        response.date = existingFeedTimeId.date.toISOString();
        response.baby_id = existingFeedTimeId.babies.id;
        response.userId = existingFeedTimeId.user.id;

        return response;

    }

    async update(
        feedtime_id,
        updateFeedTimeResponse
    ){
        
        const existingFeedTime = await this.feedTimeRepo.findOneBy({id: feedtime_id});

        if(! existingFeedTime){
            throw new NotFoundException({
                status: "error", 
                message: "Data not found!"
            })
        }
    

        //update existingFeedtime
        existingFeedTime.babies = existingFeedTime.babies;
        existingFeedTime.user = existingFeedTime.user;
        existingFeedTime.date = updateFeedTimeResponse.date;
        
        const updatedFeedTime = await this.feedTimeRepo.save(existingFeedTime)

        return {

            status: "ok", 
            message: "Feedtime successfully updated",
            data: updatedFeedTime
        }
    }

}
