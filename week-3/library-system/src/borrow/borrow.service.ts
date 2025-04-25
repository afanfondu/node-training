import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowRecord } from './borrow-record.entity';
import { IsNull, LessThan, Repository } from 'typeorm';
import { CreateBorrowRecordDto } from './dto/create-borrow-record.dto';
import { Book } from 'src/books/book.entity';
import { BookNotFoundException } from 'src/common/exceptions/book-not-found.exception';
import { Member } from 'src/members/member.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowRecord)
    private readonly borrowRecordRepository: Repository<BorrowRecord>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createBorrowRecordDto: CreateBorrowRecordDto) {
    const borrowRecord = this.borrowRecordRepository.create({
      ...createBorrowRecordDto,
      borrowDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
    });
    const book = await this.bookRepository.findOneBy({
      id: borrowRecord.bookId,
    });
    if (!book) throw new BookNotFoundException();

    const member = await this.memberRepository.findOneBy({
      id: borrowRecord.memberId,
    });
    if (!member) throw new BadRequestException('Member not found');

    book.quantity = book.quantity - 1;
    await this.bookRepository.save(book);
    return this.borrowRecordRepository.save(borrowRecord);
  }

  async returnBook(borrowRecordId: number) {
    const borrowRecord = await this.borrowRecordRepository.findOneBy({
      id: borrowRecordId,
    });

    if (!borrowRecord) throw new BadRequestException('Borrow record not found');
    if (borrowRecord.returnDate)
      throw new BadRequestException('Book already returned');

    const book = await this.bookRepository.findOneBy({
      id: borrowRecord.bookId,
    });
    if (!book) throw new BookNotFoundException();

    book.quantity = book.quantity + 1;
    await this.bookRepository.save(book);

    borrowRecord.returnDate = new Date();
    return this.borrowRecordRepository.save(borrowRecord);
  }

  overdueBooks() {
    return this.borrowRecordRepository.find({
      where: {
        returnDate: IsNull(),
        dueDate: LessThan(new Date()),
      },
      relations: ['book', 'member'],
    });
  }
}
