import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { t } from './shared/loc';
import { LoggingService } from './core/services/logging/logging.service';
import { AllExceptionsFilter } from './core/filters/allExceptions.filter';
import setupGlobalAuthGuard from './auth/utils/setupGlobalAuthGuard';

dotenv.config();

const PORT = process.env.PORT || 4000;
const TITLE = process.env.TITLE || 'Home Library Service';
const DESCRIPTION = process.env.DESCRIPTION || 'Home music library service';
const VERSION = process.env.VERSION || '1.0.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  setupGlobalAuthGuard(app);
  app.useGlobalFilters(new AllExceptionsFilter(loggingService));

  process.on('uncaughtException', (err) => {
    loggingService.error('Uncaught Exception', err.stack, 'Bootstrap');
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection', reason as string, 'Bootstrap');
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(VERSION)
    .addBearerAuth()
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(PORT);

  console.log(
    t('server-started', {
      port: String(PORT),
      url: 'http://localhost',
      serverName: TITLE,
    }),
  );
}

bootstrap();
