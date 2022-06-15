import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTodos1655232108788 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'todos',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'description',
              type: 'varchar',
            },
            {
              name: 'done',
              type: 'boolean',
            },
            {
              name: 'priority',
              type: 'varchar',
            },
            {
              name: 'finished_at',
              type: 'timestamp',
              isNullable: true
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('todos');
    }

}
