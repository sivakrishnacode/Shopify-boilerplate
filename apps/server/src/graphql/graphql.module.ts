import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphqlController } from '@/graphql/graphql.controller';

import { ShopifyExpressModule } from '@/utils/shopify-express/shopify-express.module';
import { ShopifyValidateAuthenticatedSessionMiddleware } from '@/middleware/shopify.validateAuthenticatedSession.middleware';

@Module({
  imports: [ShopifyExpressModule],
  controllers: [GraphqlController],
})
export class GraphqlModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShopifyValidateAuthenticatedSessionMiddleware)
      .forRoutes(GraphqlController);
  }
}
