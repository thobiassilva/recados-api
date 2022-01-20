import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTablesUserAndMessage1641264696299 implements MigrationInterface {
    name = 'CreateTablesUserAndMessage1641264696299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("uid" uuid NOT NULL, "title" character varying NOT NULL, "detail" character varying NOT NULL, "user_uid" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18246aced6d02090c4ebaedc71b" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "user" ("uid" uuid NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
