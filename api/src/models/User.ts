import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'


@Entity("users")
class User
{
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt:Date;
}

export {User}
