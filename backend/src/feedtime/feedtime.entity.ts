import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import { BabyEntity } from 'src/baby/baby.entity';
import { UserEntity } from 'src/user/user.entity';


@Entity({name: "feedtime", synchronize: true})
export class FeedTimeEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> BabyEntity, baby => baby.feedtimes)
    @JoinColumn({name: "babyId"})
    babies: BabyEntity;
    
    @ManyToOne( () => UserEntity, user=> user.feedtimes)
    @JoinColumn({ name: "userId"})
    user: UserEntity;

    @Column()
    date: Date;


}


