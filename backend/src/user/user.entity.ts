import { BabyEntity } from 'src/baby/baby.entity';
import { DiaperTimeEntity } from 'src/diapertime/diapertime.entity';
import { FeedTimeEntity } from 'src/feedtime/feedtime.entity';
import { NapTimeEntity } from 'src/naptime/naptime.entity';
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity({name: "user", synchronize: true})
export class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string; 
  
    @Column()
    password: string; 

    @Column()
    firstname: string; 

    @Column()
    lastname: string; 
    
    @Column()
    email: string;


    // this doesn't show on the database
    @OneToMany(()=> BabyEntity, baby => baby.user)
    babies: BabyEntity[];

    @OneToMany(()=> NapTimeEntity, naptime => naptime.user)
    naptimes: NapTimeEntity

    @OneToMany(()=> FeedTimeEntity, naptime => naptime.user)
    feedtimes: FeedTimeEntity

    @OneToMany(()=> DiaperTimeEntity, diapertime => diapertime.user)
    diapertimes: DiaperTimeEntity

}

