import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // [3] ห้ามลืม! เพื่อให้ InjectRepository ทำงานได้
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // [4] ส่งออกเพื่อให้ AuthModule เรียกใช้ได้
})
export class UsersModule {}
