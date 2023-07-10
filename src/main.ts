import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Open API REGIONS')
    .setDescription('The open api API description')
    .setVersion('1.0')
    .addTag('openapi')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('region', app, document);  
  await app.listen(3000);
}
bootstrap();
