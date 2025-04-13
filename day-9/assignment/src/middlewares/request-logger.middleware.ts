import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl } = req;
    console.log(`[${new Date().toISOString()}] ${method} ${originalUrl}`);
    next();
  }
}
