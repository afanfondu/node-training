import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class TransformUserPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('Validation failed: No user data provided');
    }

    const { email, age } = value;
    console.log(email, age);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !email ||
      typeof email !== 'string' ||
      !emailRegex.test(email.trim().toLowerCase())
    )
      throw new BadRequestException('Validation failed: Invalid email');
    if (isNaN(age) || age < 1)
      throw new BadRequestException('Validation failed: Invalid age');

    return {
      email: email.trim().toLowerCase(),
      age: parseInt(age),
    };
  }
}
