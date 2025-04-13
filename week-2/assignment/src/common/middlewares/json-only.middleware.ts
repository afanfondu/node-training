import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class JsonOnlyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.header('Content-Type') === 'application/json') {
      return next();
    }

    res.status(415).json({ message: 'Unsupported Content Type' });
  }
}
