import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { IsValidStatus } from '../decorator/is-valid-status';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsValidStatus()
  status: TaskStatus;

  @IsInt()
  userId: number;
}
