import { Controller, HttpStatus, Logger, Post, HttpCode, Body,
    UseGuards, Request, Get,
    Query
 } from '@nestjs/common';
import { UserController } from 'src/user/controller/user.controller';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/LoginDto';
import { AuthGuard } from '../auth.guard';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(UserController.name)
    constructor(private readonly authService: AuthService){}


    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async LoginUser(@Body() loginDto: LoginDto){

        try{
            return await this.authService.Login(loginDto)
        }catch(error){
            this.logger.error(AuthController.name, error)
            throw error;
        }
    }

    // @UseGuards(AuthGuard)
    // @Get('/profile')
    // getProfile(@Request() req){
    //     return req.user;
    // }

    @Get('/profile')
    async getProfile(
        @Query('userId') userId: number
    ){

        try{

            return "yes, i'm working"

        }catch(error){
            this.logger.error(UserController.name, error)
            throw error;
        }
    }



}
