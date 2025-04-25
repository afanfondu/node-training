import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Task } from '../entities/task';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtUserPayload } from 'src/auth/auth.types';

@Injectable()
export class IsUserOwnedGuard implements CanActivate {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const taskId = parseInt(request.params.id);
    if (!taskId) throw new BadRequestException('Task ID is required');

    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) throw new BadRequestException('Task not found');

    const user = request['user'] as JwtUserPayload;
    const userId = user.sub;

    if (userId !== task.userId)
      throw new ForbiddenException('You are not allowed to update this task');

    return true;
  }
}
