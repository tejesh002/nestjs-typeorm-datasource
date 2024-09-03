import { DataSource } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: [join(__dirname, './modules/tenented/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migration/tenented/*{.ts,.js}')],
});
