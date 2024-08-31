import { IsDateString, IsInt } from "class-validator";


export class UpdateFeedTimeResponse{

    @IsDateString()
    date: string;

    @IsInt()
    babyId: number; 

    @IsInt()
    userId: number;

}

