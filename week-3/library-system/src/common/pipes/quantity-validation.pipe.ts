import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { CreateBorrowRecordDto } from 'src/borrow/dto/create-borrow-record.dto';
import { Repository } from 'typeorm';
import { BookNotFoundException } from '../exceptions/book-not-found.exception';

@Injectable()
export class QuantityValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async transform(value: CreateBorrowRecordDto, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object' || !value.bookId) return value;

    const book = await this.bookRepository.findOneBy({ id: value.bookId });
    if (!book) throw new BookNotFoundException();

    if (book.quantity === 0)
      throw new BadRequestException('Book is not available');

    return value;
  }
}
