import { IsDateString, IsInt } from "class-validator";


export class UpdateDiaperTimeResponse{

    @IsDateString()
    date: string;

    @IsInt()
    babyId: number; 

    @IsInt()
    userId: number;

}