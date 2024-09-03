import { TenentDataSource } from 'src/tenentDatasource';

// const cache: { [key: string]: pg.Pool } = {};

// function PoolBuilder(this: any, connectionOptions: any) {
//   this.key = JSON.stringify(connectionOptions);
//   if (!cache[this.key]) {
//     cache[this.key] = new pg.Pool({ ...connectionOptions });
//   }
//   return cache[this.key];
// }

// const PG = { ...pg, Pool: PoolBuilder };

// export function getTenantConnection(schema: string) {
//   const options: DataSourceOptions = {
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     logging: true,
//     schema: schema,
//     driver: PG,
//     entities: [join(__dirname, './modules/tenented/**/*.entity{.ts,.js}')],
//     migrations: [join(__dirname, './migrations/tenented/*{.ts,.js}')],
//   };
//   return new DataSource(options).initialize();
// }

export function getTenantConnection(schema: string) {
  return TenentDataSource(schema).initialize();
}
