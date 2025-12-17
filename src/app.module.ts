import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoryModule } from './book-category/book-category.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'bookstore_dev',
      entities: [], 
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    BookCategoryModule,
    BookModule,
  ],
})
export class AppModule {}
