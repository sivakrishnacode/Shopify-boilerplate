import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DeliveryMethod } from '@shopify/shopify-api';
import { WebhookHandlersParam } from '@shopify/shopify-app-express';

@Module({
  imports: [ConfigModule],
})
export class WebhookHandlersService {
  constructor(private readonly configService: ConfigService) {}

  webhookHandlers: WebhookHandlersParam = {
    SHOP_UPDATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: `${this.configService.get<string>(
        'WEBHOOK_CALLBACK_URL',
      )}/webhooks/shop_update`,
    },
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: `${this.configService.get<string>(
        'WEBHOOK_CALLBACK_URL',
      )}/webhooks/app_uninstalled`,
    },
  };
}
