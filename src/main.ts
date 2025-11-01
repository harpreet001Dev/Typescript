import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://172.21.32.1:5173','https://typescript-frontend-topaz.vercel.app'],
    credentials: true
  });
  await app.listen(process.env.PORT ?? 3333, '0.0.0.0');
}
bootstrap();
