  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { BookCategoryModule } from './book-category/book-category.module';
  import { BookModule } from './book/book.module';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  import { UsersModule } from './users/users.module';

  @Module({
    imports: [

      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],      
        useFactory: async (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get<string>('DB_HOST'), 
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [], 
          autoLoadEntities: true, 
          synchronize: true, 
        }),
        inject: [ConfigService], // บอก NestJS ว่าต้องการ Inject ConfigService
      }),
      BookCategoryModule,
      BookModule,
      UsersModule,
    ],
  })
  export class AppModule {}
