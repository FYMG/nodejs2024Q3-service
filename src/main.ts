import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().addBearerAuth().build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(PORT);

  console.log(`http://localhost:${PORT}`);
}

bootstrap();
