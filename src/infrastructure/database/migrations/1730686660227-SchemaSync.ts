import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1730686660227 implements MigrationInterface {
    name = 'SchemaSync1730686660227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'administrator')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "salt" character varying(255) NOT NULL, "status" boolean NOT NULL DEFAULT false, "verificationCode" character varying(255), "recuperationCode" character varying(255), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
