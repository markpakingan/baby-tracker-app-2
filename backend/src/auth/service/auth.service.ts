import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/LoginDto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
        private jwtService: JwtService
    ){}

        
    async Login(loginDto: LoginDto): Promise<any>{

        const user = await this.repo.findOne({where: {username: loginDto.username}})


        if(!user){
            throw new NotFoundException("Username not found!")
        }

        if(user?.password !== loginDto.password){
            throw new UnauthorizedException("Incorrect password")
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const {password, ...result} = user;
        const payload = { sub:user.id, username: user.username}
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            userId: user.id
        }
        
    }

   
}
