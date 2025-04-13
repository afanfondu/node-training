import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUser(id: number, role: string) {
    if (role === 'admin') {
      return {
        id,
        role,
        permission: ['read', 'create', 'edit', 'delete'],
        message: 'Admin access granted',
      };
    }
    if (role === 'users') {
      return {
        id,
        role,
        permission: ['read'],
        message: 'User access granted',
      };
    }

    return { message: 'Unknown role' };
  }
}
