import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtUserPayload } from '../auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    if (!authHeader) throw new ForbiddenException('Invalid token');

    const [authType, token] = authHeader.split(' ');
    if (!authType.startsWith('Bearer') && !token) return false;

    const user = await this.jwtService.verifyAsync<JwtUserPayload>(token);
    request['user'] = user;

    return true;
  }
}
