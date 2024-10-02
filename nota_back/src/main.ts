import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { loggerFunc } from './middleware/logging.middleware';
import { auth } from 'express-openid-connect';
import { config as auth0config} from './config/auth0.config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(auth(auth0config))

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Gestion de projectos y tareas')
  .setDescription(' Esta es una API de Gestion de Projectos y tareas')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(loggerFunc)

  app.useGlobalFilters( new GlobalExceptionFilter())

  app.useGlobalPipes( new ValidationPipe());

  const PORT = 3001
  await app.listen(PORT);
  console.log(`Servidor funcionando correctamente en el puerto ${PORT}`);
  
}
bootstrap();
