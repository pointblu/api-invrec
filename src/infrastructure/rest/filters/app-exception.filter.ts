import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const exep = exception;
    const request = context.getRequest<Request>();
    const responseError: any = exep.getResponse();
    const requestId: any = response.getHeader('X-Request-ID');
    Logger.error(
      '❌ RequestID:' +
        requestId +
        ' - ' +
        request.url +
        ' » ' +
        responseError.message,
    );

    response.header('X-Request-ID', requestId).status(status).json({
      success: false,
      message: responseError.message,
      data: null,
    });
  }
}
