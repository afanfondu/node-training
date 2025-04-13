import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  email: string;

  @Type(() => Number)
  @IsNumber()
  age: number;
}
