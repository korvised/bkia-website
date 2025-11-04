import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@/common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('app.port');
  console.log(`Listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
