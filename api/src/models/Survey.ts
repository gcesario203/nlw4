import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'


@Entity("surveys")
class Survey
{
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt:Date;
}

export {Survey}
