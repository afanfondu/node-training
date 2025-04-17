import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ValidateTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.header('authorization')?.split(' ')[1];
    if (!token) return false;

    try {
      const user = await this.validateToken(token);
      request['user'] = user;
      return true;
    } catch (err) {
      return false;
    }
  }

  validateToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, 'secret-key', (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
  }
}
