import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRecord } from './borrow-record.entity';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { Book } from 'src/books/book.entity';
import { Member } from 'src/members/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord, Book, Member])],
  providers: [BorrowService],
  controllers: [BorrowController],
})
export class BorrowModule {}
