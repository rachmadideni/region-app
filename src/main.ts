import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Open API REGION')
    .setDescription('API REGION description')
    .setVersion('1.0')
    .addTag('openapi')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('region', app, document);
  app.enableCors({
    origin: ['http://localhost:3005', 'http://localhost:5173'],
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
