import {IsDateString, IsInt } from "class-validator";

export class CreateDiaperTimeDto{

    @IsDateString()
    date: string; 

    @IsInt()
    babyId: number; 

    @IsInt()
    userId: number; 
    
}