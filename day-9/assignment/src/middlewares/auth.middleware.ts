import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      throw new ForbiddenException('Missing or invalid authorization header');

    const expectedToken = 'secret-token';
    const token = authHeader.split(' ')[1];
    if (token !== expectedToken) throw new ForbiddenException('Invalid token');

    next();
  }
}
