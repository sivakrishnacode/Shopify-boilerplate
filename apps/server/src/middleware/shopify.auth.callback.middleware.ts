import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ShopifyExpressService } from '@/utils/shopify-express/shopify-express.service';

@Injectable()
export class ShopifyCallBackMiddleware implements NestMiddleware {
  constructor(private shopifyExpressService: ShopifyExpressService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('\n----------ShopifyCallBackMiddleware----------\n');
    return this.shopifyExpressService.shopifyApp.auth.callback()(
      req,
      res,
      next,
    );
  }
}
