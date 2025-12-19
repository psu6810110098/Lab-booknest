import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity'; // Import Entity และ Enum
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit { // เพิ่ม implements OnModuleInit
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // Auto-create Admin user for testing
    const admin = await this.findOneByEmail('admin@bookstore.com');
    if (!admin) {
      console.log('Seeding Admin User...');
      await this.create({
        email: 'admin@bookstore.com',
        password: 'adminpassword',
        role: UserRole.ADMIN,
      } as any); // cast as any เพื่อข้ามการเช็ค DTO (เฉพาะตอน seed)
    }
  }

  async create(createUserDto: CreateUserDto) {
    // Hashing Password
    // 1. สร้างค่าสุ่ม (salt) ขึ้นมาเพื่อเช็คไม่ให้ hash ซ้ำกัน
    const salt = await bcrypt.genSalt();
    
    // 2. เอา "adminpassword" + Salt มาปั่นรวมกัน (Hash)
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  // --- ปรับ Type ID เป็น string (UUID) ---

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) { // แก้ number -> string
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) { // แก้ number -> string
    // เช็คก่อนว่ามี user นี้ไหม แล้วค่อย update
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) { // แก้ number -> string
    return this.userRepository.delete(id);
  }
}