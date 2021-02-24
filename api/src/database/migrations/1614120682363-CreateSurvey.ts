import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurvey1614120682363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable
        (
            new Table(
                {
                    name:"surveys",
                    columns:
                    [
                        {
                            name:"id",
                            type:"int",
                            isPrimary:true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name:"title",
                            type:"varchar",
                            isNullable:false
                        },
                        {
                            name:"description",
                            type:"varchar",
                            isNullable:false
                        },
                        {
                            name:'createdAt',
                            type:'timestamp',
                            default:'now()'
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable("surveys")
    }

}
