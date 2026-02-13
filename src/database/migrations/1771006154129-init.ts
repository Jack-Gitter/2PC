import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771006154129 implements MigrationInterface {
    name = 'Init1771006154129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."coordinator_logs_status1_enum" AS ENUM('success', 'failure')`);
        await queryRunner.query(`CREATE TYPE "public"."coordinator_logs_status2_enum" AS ENUM('success', 'failure')`);
        await queryRunner.query(`CREATE TABLE "coordinator_logs" ("status1" "public"."coordinator_logs_status1_enum", "status2" "public"."coordinator_logs_status2_enum", "transactionId" uuid NOT NULL, CONSTRAINT "PK_174cf2518d264edf12b4436dddd" PRIMARY KEY ("transactionId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "coordinator_logs"`);
        await queryRunner.query(`DROP TYPE "public"."coordinator_logs_status2_enum"`);
        await queryRunner.query(`DROP TYPE "public"."coordinator_logs_status1_enum"`);
    }

}
