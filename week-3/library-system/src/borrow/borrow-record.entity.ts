import { Book } from 'src/books/book.entity';
import { Member } from 'src/members/member.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BorrowRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'bookId' })
  @ManyToOne(() => Book, (book) => book.borrowRecords)
  book: Book;

  @Column()
  bookId: number;

  @JoinColumn({ name: 'memberId' })
  @ManyToOne(() => Member, (member) => member.borrowRecords)
  member: Member;

  @Column()
  memberId: number;

  @Column()
  borrowDate: Date;

  @Column({ nullable: true })
  returnDate: Date;

  @Column()
  dueDate: Date;
}
