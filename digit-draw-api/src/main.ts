import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // Correctly retrieve ConfigService
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3002'],
  });
  const port = configService.get<number>('PORT') || 3000; // Use ConfigService to get the port
  await app.listen(port);
}
bootstrap();