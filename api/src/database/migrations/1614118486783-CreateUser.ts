import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateUser1614118486783 implements MigrationInterface 
{

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table(
                {
                    name:"users",
                    columns:
                    [
                        {
                            name:"id",
                            type:"int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name:"name",
                            type:"varchar",
                            isNullable: true
                        },
                        {
                            name:"email",
                            type:"varchar",
                            isUnique: true
                        },
                        {
                            name:'createdAt',
                            type:'timestamp',
                            default:'now()'
                        }
                    ]
                })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable("users");
    }

}
