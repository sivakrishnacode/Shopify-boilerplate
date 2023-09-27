import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GdprController } from '@/gdpr/gdpr.controller';

/* Middlewares */

/* Modules */
import { HelperModule } from '@/helper/helper.module';
import { ShopifyValidateAuthenticatedSessionMiddleware } from '@/middleware/shopify.validateAuthenticatedSession.middleware';
import { ShopifyExpressModule } from '@/utils/shopify-express/shopify-express.module';

@Module({
  imports: [HelperModule, ShopifyExpressModule],
  controllers: [GdprController],
})
export class GdprModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShopifyValidateAuthenticatedSessionMiddleware)
      .forRoutes(GdprController);
  }
}
