import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class JsonParsePipe implements PipeTransform {
  transform(value: string) {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new BadRequestException(
        'JSONParsePipe: Value must be a valid JSON string!',
      );
    }
  }
}
