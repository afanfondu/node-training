import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('available')
  getAvailableBooks() {
    return this.booksService.getAvailableBooks();
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }
}
