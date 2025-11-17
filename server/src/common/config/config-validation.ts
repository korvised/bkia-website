import { plainToClass } from 'class-transformer';
import {
  IsBooleanString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

import { Environment } from '@/types/config';

class EnvironmentVariables {
  // APP CONFIG
  @IsDefined()
  @IsEnum(Environment)
  APP_ENV: Environment;

  @IsDefined()
  @IsString()
  @MinLength(1)
  APP_NAME: string;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  APP_PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  APP_VERSION: string;

  // INTEGRATION CONFIG
  @IsDefined()
  @IsString()
  @MinLength(1)
  CLIENT_URL: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  HRMS_API_URL: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  HRMS_API_KEY: string;

  /* DATABASE CONFIG */
  @IsDefined()
  @IsString()
  @MinLength(1)
  DB_HOST: string;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  DB_PORT: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DB_USER: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DB_PASS: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DB_NAME: string;

  /* REDIS CONFIG */
  @IsDefined()
  @IsString()
  @MinLength(1)
  RDS_HOST: string;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  RDS_PORT: string;

  /* JWT CONFIG */
  @IsDefined()
  @IsString()
  @MinLength(10)
  JWT_SECRET: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  JWT_EXPIRESIN: string;

  /* SMTP CONFIG */
  @IsDefined()
  @IsString()
  @MinLength(1)
  SMTP_HOST: string;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  SMTP_PORT: string;

  @IsDefined()
  @IsBooleanString()
  SMTP_SECURE: string;

  @IsDefined()
  @IsEmail()
  SMTP_USER: string;

  @IsDefined()
  @IsString()
  SMTP_PASS: string;

  /* AWS CONFIG */
  @IsDefined()
  @IsString()
  @MinLength(1)
  AWS_ACCESS_KEY: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  AWS_SECRET_KEY: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  AWS_REGION: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  AWS_S3_BUCKET: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  let index = 0;
  for (const err of errors) {
    if (err.constraints) {
      Object.values(err.constraints).map((str) => {
        ++index;
        console.log(index, str);
      });
      console.log('\n ***** \n');
    }
  }

  if (errors.length)
    throw new Error('Please provide the valid ENVs mentioned above');

  return finalConfig;
}
