import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaperTimeEntity } from '../diapertime.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BabyEntity } from 'src/baby/baby.entity';
import { CreateDiaperTimeDto } from '../dto/createDiaperTime.dto';
import { GetDiaperResponseDto } from '../dto/getDiaperResponse.dto';


@Injectable()
export class DiapertimeService {

    constructor(
        @InjectRepository(DiaperTimeEntity)
        private readonly diaperTimeRepo: Repository<DiaperTimeEntity>, 

        @InjectRepository(UserEntity)
        private readonly userRepo : Repository<UserEntity>,

        @InjectRepository(BabyEntity)
        private readonly babyRepo : Repository<BabyEntity>

    ){}
        
    async create(
        createDiaperTimeDto: CreateDiaperTimeDto
    ){

        //checks if user is existing
        const existingUser = await this.userRepo.findOneBy({id: createDiaperTimeDto.userId})
        if(!existingUser){
            throw new NotFoundException({
                status: "Error", 
                message: "UserID not found!"
            })
        }


        //checks if a babyId matches UserId
        const matchedBaby = await this.babyRepo.findOne({
            where: {
                id: createDiaperTimeDto.babyId,
                user: existingUser
            }
        })


        if(!matchedBaby){
            throw new NotFoundException({
                status: "error",
                message: "baby does not belong to the specified user"
            })
        }

        // Save to diapertime entity
        const newDiaperTime = new DiaperTimeEntity;

        newDiaperTime.date = new Date(createDiaperTimeDto.date);
        newDiaperTime.babies = matchedBaby;
        newDiaperTime.user = existingUser; 
        await this.diaperTimeRepo.save(newDiaperTime)

        return{
            status: "OK",
            message: "New diaper data created successfully", 
            data: {
                date: createDiaperTimeDto.date,
                babyId: createDiaperTimeDto.babyId,
                userId: createDiaperTimeDto.userId

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

        const data = await this.diaperTimeRepo.findAndCount({
            take, 
            skip, 
            order:{
                id: 'ASC'
            }, 
            relations: ['babies', 'user'],
        })

        const [result, total] = data
        const lastPage = Math.ceil(total/ Number(size))


        const info = result.map((diapertime: DiaperTimeEntity)=> {

            const dto = new DiaperTimeEntity; 

            dto.date = diapertime.date;
            dto.babies = diapertime.babies; 
            dto.user = diapertime.user; 

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
        diapertime_id: number
    ){

        const existingDiaperTime = await this.diaperTimeRepo.findOne({
            where: {id: diapertime_id},
            relations: ['babies', 'user']
    })

        if(!existingDiaperTime){
            throw new NotFoundException({
                status: "error", 
                message: "Diaper time not found!"
            })
        }

        const response = new GetDiaperResponseDto()

        response.date = existingDiaperTime.date.toISOString();
        response.baby_id = existingDiaperTime.babies.id;
        response.userId = existingDiaperTime.user.id;

        return response;

    }

    async update(
        diaperTimeId,
        updateDiaperTimeResponse
    ){
        
        const existingDiaperTime = await this.diaperTimeRepo.findOneBy({id: diaperTimeId});

        if(! existingDiaperTime){
            throw new NotFoundException({
                status: "error", 
                message: "Data not found!"
            })
        }
    

        //update existing diapertime
        existingDiaperTime.babies = existingDiaperTime.babies;
        existingDiaperTime.user = existingDiaperTime.user;
        existingDiaperTime.date = updateDiaperTimeResponse.date;
        
        const updatedDiaperTime = await this.diaperTimeRepo.save(existingDiaperTime)

        return {

            status: "ok", 
            message: "Diapertime successfully updated",
            data: updatedDiaperTime
        }
    }
    
}
