import {IsDateString, IsInt } from "class-validator";

export class GetOneFeedTimeDto{

    @IsDateString()
    date: string; 

    @IsInt()
    baby_id: number; 

    @IsInt()
    userId: number; 
    
}