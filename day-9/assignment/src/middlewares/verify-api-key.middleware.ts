import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class VerifyApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.API_KEY;

    console.log('IP: ', req.ip);

    if (!apiKey || apiKey !== validApiKey)
      throw new ForbiddenException('Invalid API Key');

    next();
  }
}
