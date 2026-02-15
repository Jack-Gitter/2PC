import { MigrationInterface, QueryRunner } from "typeorm";

export class Coord1771170040063 implements MigrationInterface {
    name = 'Coord1771170040063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."coordinator_logs_status_enum" AS ENUM('commit', 'rollback', 'done')`);
        await queryRunner.query(`CREATE TABLE "coordinator_logs" ("status" "public"."coordinator_logs_status_enum", "transactionId" uuid NOT NULL, CONSTRAINT "PK_174cf2518d264edf12b4436dddd" PRIMARY KEY ("transactionId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "coordinator_logs"`);
        await queryRunner.query(`DROP TYPE "public"."coordinator_logs_status_enum"`);
    }

}
