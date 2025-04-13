import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string')
      throw new BadRequestException('TrimPipe: Value must be a string!');
    return value.trim();
  }
}
