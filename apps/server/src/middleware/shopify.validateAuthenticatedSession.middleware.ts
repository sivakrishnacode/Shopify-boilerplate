import { ShopifyExpressService } from '@/utils/shopify-express/shopify-express.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ShopifyValidateAuthenticatedSessionMiddleware
  implements NestMiddleware
{
  constructor(private shopifyExpressService: ShopifyExpressService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      '\n----------ShopifyValidateAuthenticatedSessionMiddleware----------\n',
    );
    return this.shopifyExpressService.shopifyApp.validateAuthenticatedSession()(
      req,
      res,
      next,
    );
  }
}
