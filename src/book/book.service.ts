import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  bookRepository: any;
 async incrementLikes(id: string) {
    const book = await this.findOne(+id);
    book.likeCount += 1;
    return this.bookRepository.save(book);
}


  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return { id, likeCount: 0 };
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
