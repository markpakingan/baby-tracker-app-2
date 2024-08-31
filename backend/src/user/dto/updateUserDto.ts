import { IsInt, IsString} from "class-validator";

export class UpdateUserDto {

    @IsInt()
    id: number; 

    @IsString()
    username: string; 

    @IsString()
    firstname: string;
     
    @IsString()
    lastname: string; 

    @IsString()
    password: string; 

    @IsString()
    email: string; 

}