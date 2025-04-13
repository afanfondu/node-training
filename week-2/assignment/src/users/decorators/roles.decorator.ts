import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

export const ROLES_KEY = 'ROLES_KEY';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
