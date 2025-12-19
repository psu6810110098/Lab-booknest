// src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// สร้าง Class DTO สำหรับรับค่า (ใส่ในไฟล์เดียวกันหรือแยกไฟล์ก็ได้)
class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post('signup') 
  async signup(@Body() body: LoginDto) {
    // ส่งไปให้ AuthService จัดการสร้าง User (ต้องมั่นใจว่าใน Service มีฟังก์ชัน signup นะครับ)
    return this.authService.signup(body.email, body.password);
  }


  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
