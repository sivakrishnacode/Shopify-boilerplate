import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DeliveryMethod } from '@shopify/shopify-api';
import { ShopifyExpressService } from '@/utils/shopify-express/shopify-express.service';

@Injectable()
export class ShopifyWebhookMiddleware implements NestMiddleware {
  constructor(private shopifyExpressService: ShopifyExpressService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('\n----------ShopifyWebhookMiddleware----------\n');
    console.log({ shop_ShopifyWebhookMiddleware: req.query.shop });
    console.log({ query_ShopifyWebhookMiddleware: req.query });
    console.log({ body_ShopifyWebhookMiddleware: req.body });
    console.log(
      '---------------------------------------------------------------',
    );

    const middleware = this.shopifyExpressService.shopifyApp.processWebhooks({
      webhookHandlers: {
        SHOP_UPDATE: {
          deliveryMethod: DeliveryMethod.Http,
          callbackUrl:
            'https://afflr-app-4-webhook-dev.ngrok.dev/api/webhooks/shop_update',
          // callbackUrl: '/api/webhooks/shop_update',
        },
        APP_UNINSTALLED: {
          deliveryMethod: DeliveryMethod.Http,
          callbackUrl:
            'https://afflr-app-4-webhook-dev.ngrok.dev/api/webhooks/app_uninstalled',
        },
      },
    });
    console.log({ middleware: JSON.stringify(middleware) });

    return middleware[0](req, res, next);
  }
}
