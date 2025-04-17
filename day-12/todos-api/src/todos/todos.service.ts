import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(todo);
  }

  findAll() {
    return this.todosRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todosRepository.preload({
      id,
      ...updateTodoDto,
    });
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return this.todosRepository.save(todo);
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    return this.todosRepository.remove(todo);
  }
}
