import { MigrationInterface, QueryRunner } from 'typeorm';

export class Admin1725386910407 implements MigrationInterface {
  name = 'Admin1725386910407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying, "email" character varying, "phone_number" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "masterAccount" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_b9681ce0dc78846292f7a1f05b5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "masterAccount"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
