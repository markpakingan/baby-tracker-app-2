import {IsDateString, IsInt } from "class-validator";

export class CreateNapTimeDto{

    @IsDateString()
    date: string; 

    @IsInt()
    babyId: number; 

    @IsInt()
    userId: number; 
    
}