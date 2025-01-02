import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = uuidv4();
    response.setHeader('X-Request-ID', requestId);
    // Guardamos una referencia al método original send
    const originalSend = response.send;
    // Sobrescribimos el método send para capturar la respuesta
    response.send = function (body: any) {
      return originalSend.call(this, body);
    };

    next();
  }
}
