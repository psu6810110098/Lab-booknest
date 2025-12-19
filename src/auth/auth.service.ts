// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


    // [เพิ่มฟังก์ชันนี้] เพื่อรองรับการ Register
  async signup(email: string, pass: string) {


    // 2. เรียก UsersService ให้สร้าง User (Default Role เป็น 'user')
    // ต้องมั่นใจว่า UsersService ของนายมีฟังก์ชัน create ที่รับ object นี้
    return this.usersService.create({
      email,
      password: pass,
      role: 'user', 
    } as any);
  }

  // ตรวจสอบ Email และ Password
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // สร้าง Token (Payload คือข้อมูลที่จะฝังใน Token)
  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
