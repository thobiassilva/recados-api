import {MigrationInterface, QueryRunner} from "typeorm";

export class TestsMigration1644897591670 implements MigrationInterface {
    name = 'TestsMigration1644897591670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("uid" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "detail" varchar NOT NULL, "user_uid" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "user" ("uid" varchar PRIMARY KEY NOT NULL, "login" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
