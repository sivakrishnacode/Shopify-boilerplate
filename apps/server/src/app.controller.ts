import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from '@/app.service';
import { NextFunction, Request, Response } from 'express';
import { ShopifyExpressService } from './utils/shopify-express/shopify-express.service';
import { AUTH_CALLBACK_PATH } from './utils/constant';
@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly shopifyExpressService: ShopifyExpressService,
  ) {}

  @Get('/')
  sendHtml(@Req() req: Request, @Res() res: Response): void {
    return res.status(200).sendFile('index.html', { root: '../client/dist' });
  }

  @Get('/exitiframe')
  sendExitiframe(@Req() req: Request, @Res() res: Response): void {
    return res.status(200).sendFile('index.html', { root: '../client/dist' });
  }

  @Get(AUTH_CALLBACK_PATH)
  getAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction,
  ): any {
    return this.shopifyExpressService.shopifyApp.redirectToShopifyOrAppRoot()(
      req,
      res,
      next,
    );
  }
}
