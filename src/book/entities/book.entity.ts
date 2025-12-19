import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BookCategory } from '../../book-category/entities/book-category.entity';
import { User } from '../../users/entities/user.entity';


@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  likeCount: number;

  @ManyToOne(() => BookCategory) 
  category: BookCategory;

  @Column({ nullable: true })
  categoryId: string; 

  @ManyToMany(() => User, (user) => user.likedBooks)
  @JoinTable()
  likedBy: User[];
  
}