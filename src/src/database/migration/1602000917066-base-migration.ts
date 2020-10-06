import {MigrationInterface, QueryRunner} from "typeorm";

export class baseMigration1602000917066 implements MigrationInterface {
    name = 'baseMigration1602000917066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reminder" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "isRecurring" boolean NOT NULL, "notifyOffset" integer NOT NULL, "notifyType" character varying NOT NULL, "message" character varying, "url" character varying, CONSTRAINT "PK_9ec029d17cb8dece186b9221ede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4cc144b2a558182ac6d869d2a" ON "reminder" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_c4cc144b2a558182ac6d869d2a"`);
        await queryRunner.query(`DROP TABLE "reminder"`);
    }

}
