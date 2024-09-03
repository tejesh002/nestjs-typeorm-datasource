import { MigrationInterface } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { PostgresQueryRunner } from 'typeorm/driver/postgres/PostgresQueryRunner';

export class Tenented1725387569627 implements MigrationInterface {
  name = 'Tenented1725387569627';

  public async up(queryRunner: PostgresQueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;
    await queryRunner.query(
      `CREATE TABLE "${schema}"."user" ("id" SERIAL NOT NULL, "name" character varying, "email" character varying, "phone_number" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: PostgresQueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;
    await queryRunner.query(`DROP TABLE "${schema}"."user"`);
  }
}
