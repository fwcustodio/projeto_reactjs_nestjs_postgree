import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);

  async use(req: Request, res: Response, next: NextFunction) {
    const { token } = req.headers;
    const method = req.method;
    const baseUrl = req.baseUrl;

    // Utiliza o LoggerService para imprimir logs
    this.logger.log(`[${new Date().toISOString()}] ${method} ${baseUrl}`);

    next();
  }
}
