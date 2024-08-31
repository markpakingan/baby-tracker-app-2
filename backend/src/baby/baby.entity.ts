import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Gender } from './gender.enum';
import { UserEntity } from 'src/user/user.entity';
import { NapTimeEntity } from 'src/naptime/naptime.entity';
import { FeedTimeEntity } from 'src/feedtime/feedtime.entity';
import { DiaperTimeEntity } from 'src/diapertime/diapertime.entity';


@Entity({name: "baby", synchronize: true})
export class BabyEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    name: string; 
    
    @Column()
    dateOfBirth: Date;


    @Column({ type: 'enum', enum: Gender, default: Gender.male})
    gender: Gender;

    @ManyToOne(()=> UserEntity, user => user.babies )
    @JoinColumn({name: "userId"})
    user: UserEntity;
    
    //this doesn't show on the entity

    @OneToMany(()=> NapTimeEntity, naptime => naptime.babies)
    naptimes: NapTimeEntity;

    @OneToMany(()=> FeedTimeEntity, feedTime => feedTime.babies)
    feedtimes: FeedTimeEntity;

    @OneToMany(()=> DiaperTimeEntity, diapertime => diapertime.babies)
    diapertimes: DiaperTimeEntity;

}

