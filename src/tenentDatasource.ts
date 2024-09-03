import { join } from 'path';
import { DataSource } from 'typeorm';
import * as pg from 'pg';
const cache: { [key: string]: pg.Pool } = {};

function PoolBuilder(this: any, connectionOptions: any) {
  this.key = JSON.stringify(connectionOptions);
  if (!cache[this.key]) {
    cache[this.key] = new pg.Pool({ ...connectionOptions });
  }
  return cache[this.key];
}

const PG = { ...pg, Pool: PoolBuilder };

export const TenentDataSource = (schema: string) => {
  console.info('schemaa')
  console.info(schema)
  return new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    schema: schema,
    entities: [join(__dirname, '/modules/tenented/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '/migration/tenented/*{.ts,.js}')],
  });
};
