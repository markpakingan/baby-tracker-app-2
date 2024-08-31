import {IsDateString, IsInt } from "class-validator";

export class CreateFeedTimeDto{

    @IsDateString()
    date: string; 

    @IsInt()
    babyId: number; 

    @IsInt()
    userId: number; 
    
}