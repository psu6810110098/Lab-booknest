import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createBookDto: CreateBookDto, @CurrentUser() user: any) {
    // เช็คสิทธิ์ตรงนี้แทนการสร้างไฟล์ Guard ใหม่
    if (user.role !== 'admin') throw new ForbiddenException('Admin only'); 
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @CurrentUser() user: any) {
    if (user.role !== 'admin') throw new ForbiddenException('Admin only');
    return this.bookService.update(id, updateBookDto);
  } 

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    // เช็คสิทธิ์ตรงนี้ครับ จบในไฟล์เดียว
    if (user.role !== 'admin') throw new ForbiddenException('Admin only');
    return this.bookService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/like')
  async toggleLike(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookService.toggleLike(id, +user.userId);
  }
}