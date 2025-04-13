import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsInt()
  @Type(() => Number)
  @Min(18)
  @Max(65)
  age: number;
}
