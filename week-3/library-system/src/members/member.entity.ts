import { BorrowRecord } from 'src/borrow/borrow-record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => BorrowRecord, (borrowRecord) => borrowRecord.book)
  borrowRecords: BorrowRecord[];
}
