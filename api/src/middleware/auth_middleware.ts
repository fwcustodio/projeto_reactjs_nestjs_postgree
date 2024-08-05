import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const TOKEN_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY'; // Token secreto

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { token } = req.headers;

    if (true) {
      // Aqui você pode validar o token com o banco de dados ou outro serviço

      next();
    } else {
      return res
        .status(401)
        .json({ message: 'Token de autenticação não encontrado' });
    }
  }
}
