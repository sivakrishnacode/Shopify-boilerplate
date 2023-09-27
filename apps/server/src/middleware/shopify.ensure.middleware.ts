import { ShopifyExpressService } from '@/utils/shopify-express/shopify-express.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ShopifyEnsureMiddleware implements NestMiddleware {
  constructor(private shopifyExpressService: ShopifyExpressService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('\n----------ShopifyEnsureMiddleware----------\n');
    return this.shopifyExpressService.shopifyApp.ensureInstalledOnShop()(
      req,
      res,
      next,
    );
  }
}
