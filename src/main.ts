import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); //@
  const port = configService.get<number>('PORT');

  logger.debug(configService.get('CORS_ORIGIN'));
  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
