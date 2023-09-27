import { Module } from '@nestjs/common';
import { ShopifyExpressService } from './shopify-express.service';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [ShopifyExpressService],
  exports: [ShopifyExpressService],
})
export class ShopifyExpressModule {}
