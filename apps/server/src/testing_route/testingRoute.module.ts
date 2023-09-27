import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TestingRouteController } from '@/testing_route/testingRoute.controller';

/* Modules */
import { ShopifyValidateAuthenticatedSessionMiddleware } from '@/middleware/shopify.validateAuthenticatedSession.middleware';
import { ShopifyExpressModule } from '@/utils/shopify-express/shopify-express.module';
@Module({
  imports: [ShopifyExpressModule, ShopifyExpressModule],
  controllers: [TestingRouteController],
})
export class TestingRouteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShopifyValidateAuthenticatedSessionMiddleware)
      .forRoutes(TestingRouteController);
  }
}
