import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

/* Modules */
import { GdprModule } from '@/gdpr/gdpr.module';
import { GraphqlModule } from '@/graphql/graphql.module';
import { HelperModule } from '@/helper/helper.module';
import { ShopifyExpressModule } from './utils/shopify-express/shopify-express.module';
import { TestingRouteModule } from './testing_route/testingRoute.module';

// Middleware
import { ShopifyCallBackMiddleware } from './middleware/shopify.auth.callback.middleware';
import { ShopifyEnsureMiddleware } from './middleware/shopify.ensure.middleware';
import { ShopifyCSPMiddleware } from './middleware/shopify.csp.middleware';
import {
  AUTH_CALLBACK_PATH,
  AUTH_PATH,
  ROOT_PATH,
  WEBHOOKS_PATH,
} from './utils/constant';
import { WebhookHandlerModule } from './utils/webhooks/webhookHandler.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client', 'dist'),
      exclude: [ROOT_PATH, AUTH_PATH, AUTH_CALLBACK_PATH, WEBHOOKS_PATH],
    }),

    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../', '.env'),
      isGlobal: true,
    }),

    TestingRouteModule,
    ShopifyExpressModule,
    GraphqlModule,
    GdprModule,
    HelperModule,
    WebhookHandlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ShopifyCSPMiddleware)
      .exclude(
        '/api/auth',
        '/api/auth/(.*)',
        '/api/webhooks',
        '/api/webhooks/(.*)',
        'graphql',
      )
      .forRoutes('*');
    consumer.apply(ShopifyCallBackMiddleware).forRoutes(AUTH_CALLBACK_PATH);
    consumer
      .apply(ShopifyEnsureMiddleware)
      .exclude(
        { path: '/exitiframe', method: RequestMethod.GET },
        { path: AUTH_CALLBACK_PATH, method: RequestMethod.GET },
      )
      .forRoutes(AppController);
  }
}
