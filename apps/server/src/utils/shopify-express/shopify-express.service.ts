import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { shopifyApp } from '@shopify/shopify-app-express';
import { LATEST_API_VERSION, LogSeverity } from '@shopify/shopify-api';
import { PrismaSessionStorage } from '@shopify/shopify-app-session-storage-prisma';
import { AUTH_CALLBACK_PATH, AUTH_PATH, WEBHOOKS_PATH } from '../constant';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
@Module({
  imports: [ConfigModule],
})
export class ShopifyExpressService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  private readonly storage = new PrismaSessionStorage(this.prismaService);

  private readonly shopifyAppInstance = shopifyApp({
    api: {
      apiKey: this.configService.get<string>('SHOPIFY_API_KEY'),
      apiSecretKey: this.configService.get<string>('SHOPIFY_API_SECRET'),
      scopes: this.configService.get<string>('SHOPIFY_API_SCOPES').split(','),
      hostName: this.configService
        .get<string>('SHOPIFY_APP_URL')
        .replace(/https:\/\//, ''),
      hostScheme: 'https',
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: true,
      logger: {
        level: LogSeverity.Debug,
      },
    },
    sessionStorage: this.storage,
    auth: {
      path: AUTH_PATH,
      callbackPath: AUTH_CALLBACK_PATH,
    },
    webhooks: {
      path: WEBHOOKS_PATH,
    },
  });

  get shopifyApp() {
    return this.shopifyAppInstance;
  }
}
