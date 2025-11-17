import type { StringValue } from 'ms';

export enum ConfigKey {
  app = 'app',
  igt = 'igt',
  db = 'db',
  rds = 'rds',
  jwt = 'jwt',
  smtp = 'smtp',
  aws = 'aws',
}

export enum Environment {
  development = 'development',
  production = 'production',
  testing = 'testing',
}

export interface IAppConfig {
  env: Environment;
  port: number;
  name: string;
  version: string;
}

export interface IIntegrationConfig {
  clientUrl: string;
  hrmsApiUrl: string;
  hrmsApiKey: string;
}

export interface IDbConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
}

export interface IRdsConfig {
  host: string;
  port: number;
}

export interface IJwtConfig {
  secret: string;
  expiresIn: StringValue;
}

export interface ISmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

export interface IAwsConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}

export interface IConfig {
  app: IAppConfig;
  igt: IIntegrationConfig;
  db: IDbConfig;
  rds: IRdsConfig;
  jwt: IJwtConfig;
  smtp: ISmtpConfig;
  aws: IAwsConfig;
}
