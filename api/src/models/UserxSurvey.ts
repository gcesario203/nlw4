import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'


@Entity("usersxsurveys")
class UsersxSurveys
{
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    userId: number;

    @Column()
    surveyId: number;

    @Column()
    value:number

    @CreateDateColumn()
    createdAt:Date;
}

export {UsersxSurveys}
