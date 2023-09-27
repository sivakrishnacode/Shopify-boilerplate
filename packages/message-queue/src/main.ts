import { NestFactory } from '@nestjs/core';
import { MessageQueueModule } from './message-queue.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MessageQueueModule);
  await app.init();
}
bootstrap();
