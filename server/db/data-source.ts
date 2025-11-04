import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config({
  path: '.env'
  // path: '.env.prod'
});

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/**/**/*.entity.ts'],
  migrations: ['db/migrations/*.ts'],
  migrationsTableName: 'migrations'
};

export default new DataSource(dataSourceOptions);
