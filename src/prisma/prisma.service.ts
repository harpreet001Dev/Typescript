import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const isProd = process.env.NODE_ENV === 'production';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
    async onModuleInit() {
        await this.$connect();
        console.log('Connected to the database 🟢');
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
