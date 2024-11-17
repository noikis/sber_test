import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );

  const docsConfig = new DocumentBuilder()
    .setTitle('Coding Test SberMarketing')
    .setDescription(
      `Реализовать RESTful-сервис для работы с информацией о пользователях`,
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig);
  document.servers = [{ url: '/' }];
  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(port, host, () => {
    Logger.log(`server started on ${host}:${port}`);
  });
}

bootstrap();
