import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import { BabyEntity } from 'src/baby/baby.entity';
import { UserEntity } from 'src/user/user.entity';


@Entity({name: "diapertime", synchronize: true})
export class DiaperTimeEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date: Date;

    @ManyToOne(()=> BabyEntity, baby => baby.diapertimes)
    @JoinColumn({name: "babyId"})
    babies: BabyEntity;
    
    @ManyToOne( () => UserEntity, user=> user.diapertimes)
    @JoinColumn({ name: "userId"})
    user: UserEntity;


}