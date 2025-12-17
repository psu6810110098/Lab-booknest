import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  // 1. Inject Repository ให้ถูกต้อง
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    // บันทึกข้อมูลลง Database
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  findAll() {
    // ดึงข้อมูลพร้อม relations
    return this.bookRepository.find({ relations: ['category'] });
  }

  // เปลี่ยน id: number เป็น id: string
  async findOne(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!book) throw new NotFoundException();
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    this.bookRepository.merge(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    return this.bookRepository.remove(book);
  }

  async incrementLikes(id: string) {
    // เรียก findOne ที่แก้เป็น string แล้ว
    const book = await this.findOne(id);
    book.likeCount += 1;
    return this.bookRepository.save(book);
  }
}