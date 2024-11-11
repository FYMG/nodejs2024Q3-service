import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { t } from './shared/loc';

dotenv.config();

const PORT = process.env.PORT || 4000;
const TITLE = process.env.TITLE || 'Home Library Service';
const DESCRIPTION = process.env.DESCRIPTION || 'Home music library service';
const VERSION = process.env.VERSION || '1.0.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
