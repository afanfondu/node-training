import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class IsEvenPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val))
      throw new BadRequestException(
        'Validation failed: value must be a number',
      );
    if (val % 2 !== 0)
      throw new BadRequestException('Validation failed: value must be even');

    return value;
  }
}
