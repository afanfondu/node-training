import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToUpperCasePipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string')
      throw new BadRequestException('UppercasePipe: Value must be a string!');

    return value.toUpperCase();
  }
}
