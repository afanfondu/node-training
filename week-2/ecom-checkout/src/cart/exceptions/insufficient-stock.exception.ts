import { BadRequestException } from '@nestjs/common';

export class InsufficientStockExcpetion extends BadRequestException {
  constructor() {
    super('Not enough stock');
  }
}
