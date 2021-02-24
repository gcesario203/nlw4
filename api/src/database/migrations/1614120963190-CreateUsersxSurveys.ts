import {MigrationInterface, QueryRunner, TableForeignKey, Table} from "typeorm";

export class CreateUsersxSurveys1614120963190 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(
            new Table(
                {
                    name:"usersxsurveys",
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
                            name:"userId",
                            type:"int",
                        },
                        {
                            name:"surveyId",
                            type:"int",
                        },
                        
                        {
                            name:"value",
                            type:"int"
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

        await queryRunner.createForeignKeys("usersxsurveys",
        [
            new TableForeignKey(
                {
                    columnNames:["userId"],
                    referencedColumnNames:["id"],
                    referencedTableName: "users",
                    onDelete:"CASCADE"
                }
            ),
            new TableForeignKey(
                {
                    columnNames:["surveyId"],
                    referencedColumnNames:["id"],
                    referencedTableName: "surveys",
                    onDelete:"CASCADE"
                }
            )
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        const table = await queryRunner.getTable("usersxsurveys");

        const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        const foreignKeySurvey = table.foreignKeys.find(fk => fk.columnNames.indexOf("surveyId") !== -1);
        

        await queryRunner.dropForeignKeys("usersxsurveys",
            [
                foreignKeyUser,
                foreignKeySurvey
            ])

        await queryRunner.dropTable("usersxsurveys");
    }

}
