import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task';
import { Like, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/entities/user';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserTasks(userId: number) {
    const tasks = await this.taskRepository.find({
      where: { userId },
      relations: ['createdBy'],
    });
    return tasks;
  }

  searchTasks(search: string) {
    return this.taskRepository.find({
      where: [{ title: Like(`%${search}%`), description: Like(`%${search}%`) }],
    });
  }

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.userRepository.findOneBy({
      id: createTaskDto.userId,
    });
    if (!user) throw new BadRequestException('User not found');

    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto,
    });

    if (!task) throw new BadRequestException('Task not found');

    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new BadRequestException('Task not found');
    return this.taskRepository.remove(task);
  }
}
