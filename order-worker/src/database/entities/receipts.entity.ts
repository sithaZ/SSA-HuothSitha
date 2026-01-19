import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('receipt')
export class ReceiptsEntity {
  @PrimaryGeneratedColumn('uuid')
  receiptId: string;

  @Column({ type: 'timestamptz', nullable: false })
  issuedAt: Date;

  @Column({ type: 'varchar', length: 266, nullable: false })
  name: string;

  @Column({ type: 'numeric', nullable: false })
  price: number;
}
