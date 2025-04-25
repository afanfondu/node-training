import { BorrowRecord } from 'src/borrow/borrow-record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  ISBN: string;

  @Column()
  quantity: number;

  @OneToMany(() => BorrowRecord, (borrowRecord) => borrowRecord.book)
  borrowRecords: BorrowRecord[];
}
