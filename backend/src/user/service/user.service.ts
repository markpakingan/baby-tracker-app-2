import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUserDto';
import { CreateResponseDto } from '../dto/createResponseDto';
import { UpdateUserDto } from '../dto/updateUserDto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
      private readonly saltRounds = 10;

    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
      ) {}

      
      async hashPassword(password:string): Promise<string>{
        return await bcrypt.hash(password, this.saltRounds); 
    }

  
      async create(createUserDto: CreateUserDto): Promise<CreateResponseDto>{

        const existingUser = await this.repo.findOne({where: {username: createUserDto.username}});
        const hashedPassword = await this.hashPassword(createUserDto.password);
        createUserDto.password = hashedPassword; 


        if(existingUser){
          throw new NotFoundException("Username already exist!")
        }


        const newUser = await this.repo.create(createUserDto);
        await this.repo.save(newUser)

        const response = new CreateResponseDto();

        response.status = "Successful!";
        response.message = "Record successfully created";
        response.data = {
          id: createUserDto.id,
          username: createUserDto.username,
          firstname: createUserDto.firstname,
          lastname: createUserDto.lastname,
          email: createUserDto.email
        }

        return response;
      }


      async getAll(
        
        page: number, 
        order: string, 
        size: number, 
      ){


        const take: number = size || 5; 
        const skip: number = (page - 1) * take;


        const data = await this.repo.findAndCount({
          take, 
          skip, 
          order:{
            id: 'ASC'
          }
        })

        const [result, total] = data; 
        const lastPage = Math.ceil(total/ Number(size))


        const info = result.map((user: UserEntity)=> {

          const dto = new UserEntity; 

          dto.id = user.id; 
          dto.username = user.username; 
          dto.firstname = user.firstname; 
          dto.lastname = user.lastname; 
          dto.email = user.email; 

          return dto;

        })

        return {
          count: total, 
          rows: info, 
          cpage: Number(page), 
          tpage: lastPage
        }

      }


    async getOne(
      id: number
    ){

      const existingUser = await this.repo.findOne({where: {id}})

      if (!existingUser){
        throw new NotFoundException("UserID not found!")
      }


      const foundUser =  new UserEntity; 
      foundUser.id = existingUser.id;
      foundUser.username = existingUser.username; 
      foundUser.firstname = existingUser.firstname; 
      foundUser.lastname = existingUser.lastname; 
      foundUser.email = existingUser.email; 


      return {
        status: "OK", 
        message: "User found successfully",
        data: foundUser
      }

  
    }

    //gets userInfo including the password
    async getUserInfo(
      id: number
    ){

      const existingUser = await this.repo.findOne({where: {id}})

      if (!existingUser){
        throw new NotFoundException("UserID not found!")
      }


      const foundUser =  new UserEntity; 
      foundUser.id = existingUser.id;
      foundUser.username = existingUser.username; 
      foundUser.firstname = existingUser.firstname; 
      foundUser.lastname = existingUser.lastname; 
      foundUser.password = existingUser.password; 
      foundUser.email = existingUser.email; 


      return {
        status: "OK", 
        message: "User found successfully",
        data: foundUser
      }

  
    }

  async update(
    updateUserDto: UpdateUserDto, 
    id: number
  ){

    const existingUser = await this.repo.findOneBy({id})

    if (!existingUser){
      throw new NotFoundException("UserID not found!")
    }

    // updates the existing user
    existingUser.username = updateUserDto.username; 
    existingUser.firstname = updateUserDto.firstname; 
    existingUser.lastname = updateUserDto.lastname; 
    existingUser.password = updateUserDto.password; 
    existingUser.email = updateUserDto.email;

    await this.repo.save(existingUser)

    return {
      status :"Updated",
      message : "Record successfully updated",
      data : {
        "id": existingUser.id,
        "username": existingUser.username,
        "firstname": existingUser.firstname,
        "lastname": existingUser.lastname,
        "email": existingUser.email,
        "password": "*******"
      }
    }

  }


}
