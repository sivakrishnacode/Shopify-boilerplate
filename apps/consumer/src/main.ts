import { NestFactory } from '@nestjs/core';
import { WebhookListnerModule } from './webhook-listner/webhook-listner.module';

async function bootstrap() {
  const webhookListner = await NestFactory.create(WebhookListnerModule);

  webhookListner.init();
}
bootstrap();
