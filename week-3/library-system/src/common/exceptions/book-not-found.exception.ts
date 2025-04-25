import { HttpException } from '@nestjs/common';

export class BookNotFoundException extends HttpException {
  constructor() {
    super('Book not found', 404);
  }
}
