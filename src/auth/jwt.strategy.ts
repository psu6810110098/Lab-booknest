// src/auth/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // 1. รับ Token: ดึงจาก Header ที่ชื่อ Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. หมดอายุห้ามเข้า: ตั้งเป็น false คือต้องเช็ควันหมดอายุ
      ignoreExpiration: false,
      // 3. กุญแจลับ: ต้องใช้ดอกเดียวกับตอนเซ็นชื่อ (Sign) ใน AuthService
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  // ฟังก์ชันนี้จะทำงานอัตโนมัติเมื่อ Token ถูกต้อง
  async validate(payload: any) {
    // payload คือข้อมูลที่แกะออกมาจาก Token (sub, email, role)
    // return อะไรไป ค่าจะไปโผล่ที่ `req.user` ใน Controller
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}