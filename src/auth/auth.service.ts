import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prisma : PrismaService){}

  async signup(data: { email: string; password: string; firstName?: string; lastName?: string }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        hash,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    return { id: user.id, email: user.email };
  }

  async signin(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(data.password, user.hash);
    if (!passwordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return { id: user.id, email: user.email };
  }
}