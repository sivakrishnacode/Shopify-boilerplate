import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from '@/app.module';
import { join } from 'path';
import { AUTH_PATH, WEBHOOKS_PATH } from './utils/constant';
import { ShopifyExpressService } from './utils/shopify-express/shopify-express.service';
import { WebhookHandlersService } from './utils/webhooks/webhookHandlers.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import validationPipeOptions from './utils/options/validationPipeOptions';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.enableCors();
  app.use(helmet());

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.useStaticAssets(join(__dirname, '../../', 'client', 'dist'), {
    index: false,
  });

  // ===================== Shopify-App-Express =====================
  const shopifyExpressService = app.get(ShopifyExpressService);
  const webhookHandlers = app.get(WebhookHandlersService).webhookHandlers;
  httpAdapter.get(AUTH_PATH, shopifyExpressService.shopifyApp.auth.begin());
  const hooksHandler = shopifyExpressService.shopifyApp.processWebhooks({
    webhookHandlers,
  })[0];
  httpAdapter.post(WEBHOOKS_PATH, hooksHandler);
  // ===================== End of Shopify-App-Express =====================

  await app.listen(3000);
}
bootstrap();
