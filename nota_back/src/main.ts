import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters( new GlobalExceptionFilter())

  app.useGlobalPipes( new ValidationPipe({
    // whitelist: true,
    // forbidNonWhitelisted: true,
    // transform: true,
  }));

  const PORT = 3001
  await app.listen(PORT);
  console.log(`Servidor funcionando correctamente en el puerto ${PORT}`);
  
}
bootstrap();
