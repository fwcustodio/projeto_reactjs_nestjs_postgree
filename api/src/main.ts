import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { urlencoded, json } from 'express';
import { AllExceptionsFilter } from './middleware/all_exceptions.filter';

async function bootstrap() {
  let app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('SIRS-API')
    .setDescription('API do projeto SIRS - FUNAC')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(parseInt(process.env.PORT ?? '3000'));
}
bootstrap();
