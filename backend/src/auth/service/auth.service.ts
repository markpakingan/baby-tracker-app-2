import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/LoginDto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly saltRounds = 10

    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
        private jwtService: JwtService,
    ){}



    async validatePassword(password:string, hashedPassword:string): Promise<boolean>{
        return await bcrypt.compare(password, hashedPassword)
    }
        

    async Login(loginDto: LoginDto): Promise<any>{

        const user = await this.repo.findOne({where: {username: loginDto.username}})


        if(!user){
            throw new NotFoundException("Username not found!")
        }


        const isPasswordValid = await this.validatePassword(loginDto.password, user.password)

        if(!isPasswordValid){
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
