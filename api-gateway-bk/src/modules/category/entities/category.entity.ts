import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Product } from '../../product/entities/product.entity'; // You will create this file next

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
