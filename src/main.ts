import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // app.enableCors({ origin: true, credentials: true });
  app.enableCors({ origin: 'http://localhost:5173', credentials: true });
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
