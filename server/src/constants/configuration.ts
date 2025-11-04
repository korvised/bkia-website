import { registerAs } from '@nestjs/config';
import { StringValue } from 'ms';
import {
  ConfigKey,
  Environment,
  IAppConfig,
  IAwsConfig,
  IClientConfig,
  IDbConfig,
  IJwtConfig,
  ISmtpConfig,
} from '@/types/config';

const appConfig = registerAs<IAppConfig>(ConfigKey.app, () => ({
  env: Environment[process.env.APP_ENV!] as Environment,
  port: Number(process.env.APP_PORT),
  name: process.env.APP_NAME!,
  version: process.env.APP_VERSION!,
}));

const clientConfig = registerAs<IClientConfig>(ConfigKey.client, () => ({
  url: process.env.CLIENT_URL!,
}));

const databaseConfig = registerAs<IDbConfig>(ConfigKey.db, () => ({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER!,
  pass: process.env.DB_PASS!,
  name: process.env.DB_NAME!,
}));

const jwtConfig = registerAs<IJwtConfig>(ConfigKey.jwt, () => ({
  secret: process.env.JWT_SECRET!,
  expiresIn: process.env.JWT_EXPIRESIN! as StringValue,
}));

const smtpConfig = registerAs<ISmtpConfig>(ConfigKey.smtp, () => ({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  secure: process.env.SMTP_SECURE! === 'true',
  user: process.env.SMTP_USER!,
  pass: process.env.SMTP_PASS!,
}));

const awsConfig = registerAs<IAwsConfig>(ConfigKey.aws, () => ({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
  bucket: process.env.AWS_S3_BUCKET!,
}));

export const configurations = [
  appConfig,
  clientConfig,
  databaseConfig,
  jwtConfig,
  smtpConfig,
  awsConfig,
];
