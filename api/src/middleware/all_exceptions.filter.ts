import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const path = httpAdapter.getRequestUrl(ctx.getRequest());
    const method = httpAdapter.getRequestMethod(ctx.getRequest());
    let statusCode;
    let responseBody: {
      error: string;
      message: string | string[];
    };

    const message = exception.message.replace(/\n/g, '');

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      responseBody = exception.getResponse() as any;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      statusCode = HttpStatus.BAD_REQUEST;

      responseBody = {
        error: 'Prisma Know Error',
        message,
      };
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      statusCode = HttpStatus.BAD_REQUEST;

      responseBody = {
        error: 'Prisma Unknow Error',
        message,
      };
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseBody = {
        error: 'Erro de validação. Parametros enviados estão incorretos',
        message,
      };
    } else {
      statusCode = HttpStatus.BAD_REQUEST;
      responseBody = {
        error: 'Unknown Error',
        message,
      };
    }

    Logger.error(
      `[${method}] ${path} ${statusCode} ${responseBody.error}`,
      exception,
      'ExceptionFilter',
    );
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
