export enum ConfigKey {
  app = 'app',
  client = 'client',
  db = 'db',
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

export interface IDbConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
}

export interface IJwtConfig {
  secret: string;
  expiresIn: string;
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
  db: IDbConfig;
  jwt: IJwtConfig;
  smtp: ISmtpConfig;
  aws: IAwsConfig;
}
