import {Column, CreateDateColumn,Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Survey } from './Survey';
import { User } from './User';


@Entity("usersxsurveys")
class UsersxSurveys
{
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    userId: number

    @ManyToOne(()=> User)
    @JoinColumn({name:"userId"})
    user: User

    @Column()
    surveyId: number;

    @ManyToOne(()=> Survey)
    @JoinColumn({name:"surveyId"})
    survey: Survey

    @Column()
    value:number

    @CreateDateColumn()
    createdAt:Date;
}

export {UsersxSurveys}
