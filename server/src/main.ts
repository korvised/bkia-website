import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@/common/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from '@/common/filters';
import { formatValidationErrors } from '@/utils';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const configService = app.get<ConfigService>(ConfigService);

  // Global error filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // allow conversion underneath
      },
      exceptionFactory: (errors) => {
        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          error: formatValidationErrors(errors),
        });
      },
    }),
  );

  const PORT = configService.get('app.port') || 8080;
  await app.listen(PORT);

  console.log(`Server is running on port: ${PORT} 🚀🚀🚀`);
})();
