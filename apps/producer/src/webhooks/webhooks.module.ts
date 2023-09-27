/* Packages   */
import { KafkaClient, MessageQueueModule } from '@afflr/message-queue';
import { MiddlewareConsumer, Module } from '@nestjs/common';

/* Middlewares */
import { VerifyHmac } from 'src/middleware/verify-hmac.middleware';

/* Services */
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MessageQueueModule.registerAsync({
      client: {
        clientId: 'webhook-CID',
        brokers: ['pkc-l7pr2.ap-south-1.aws.confluent.cloud:9092'],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: 'YEIDWF6YKYBM5NXB',
          password:
            'Y5WdrZL5ZLRK4uYxvGSXEw3qG418pdB3dI6Sr/NkZ3732S4s/AYq9giZbjHcCE8t',
        },
      },
      consumer: {
        groupId: 'webhook-GID',
      },
    }),
  ],
  providers: [WebhooksService, KafkaClient],
  controllers: [WebhooksController],
})
export class WebhooksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyHmac).forRoutes(WebhooksController);
  }
}
