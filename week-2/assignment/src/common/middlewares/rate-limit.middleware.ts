import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requestMap = new Map<string, { count: number; timetamp: number }>();
  private limit = 3;
  private windowMs = 60 * 1000;
  use(req: Request, res: Response, next: () => void) {
    const ip = req.ip as string;
    console.log('ip', ip);
    const record = this.requestMap.get(ip);
    const currentTime = Date.now();

    if (!record || currentTime - record.timetamp > this.windowMs) {
      this.requestMap.set(ip, { count: 1, timetamp: currentTime });
      console.log('set', this.requestMap);
      return next();
    }

    if (record && record.count < this.limit) {
      this.requestMap.set(ip, {
        count: record.count + 1,
        timetamp: record.timetamp,
      });
      console.log('increment', this.requestMap);
      return next();
    }

    res
      .status(HttpStatus.TOO_MANY_REQUESTS)
      .json({ message: 'Rate limit exceeded. Try again later.' });
  }
}
