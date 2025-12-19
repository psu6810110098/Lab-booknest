// src/users/dto/create-user.dto.ts

import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  // 1. Email: ต้องมีค่าและต้องเป็นรูปแบบอีเมล
  @IsEmail({}, { message: 'รูปแบบอีเมลไม่ถูกต้อง' })
  @IsNotEmpty()
  email: string;

  // 2. Password: ต้องมีค่าและยาวอย่างน้อย 6 ตัวอักษร
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร' })
  password: string;

  // 3. Role: เป็นทางเลือก (Optional) ถ้าไม่ส่งมาจะเป็น USER โดยอัตโนมัติ
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role ต้องเป็น ADMIN หรือ USER เท่านั้น' })
  role?: UserRole;
}