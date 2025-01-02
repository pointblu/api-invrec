// data-source.ts (para TypeORM 0.3.x o superior)
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_CONNECTION as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/infrastructure/database/mapper/*.js'],
  synchronize: true, // `false` en producción
  logging: true,
  logger: 'file',
  extra: {
    max: 5000, // Máximo número de conexiones
  },
});
