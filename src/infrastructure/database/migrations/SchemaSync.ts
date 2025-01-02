import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1642345678901 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Aquí TypeORM incluirá las operaciones SQL para reflejar todos los cambios
        // en las entidades User, Product, y Order
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Aquí TypeORM incluirá las operaciones SQL para revertir los cambios
    }
}
