import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else if (exception instanceof Error) {
      // Personaliza el mensaje de error para hacerlo más descriptivo
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });

    // Muestra un log simplificado en la consola
    console.error(`[Error]: ${message}`);
  }
}
