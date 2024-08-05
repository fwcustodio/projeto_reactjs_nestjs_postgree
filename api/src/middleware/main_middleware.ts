import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MainMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    //const { token } = req.headers;
    res.set({ 'access-control-expose-headers': '*', mode: 'no-cors' }); // CORS

    next();
  }
}
