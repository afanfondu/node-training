import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'];
    if (!user) return false;

    const requiredRoles = this.reflector.get<string[] | undefined>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    return requiredRoles.includes(user.role);
  }
}
