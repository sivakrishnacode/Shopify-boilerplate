import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { WebhookListnerService } from './webhook-listner.service';
import { KafkaClient, MessageQueueModule } from '@afflr/message-queue';

@Module({
  imports: [
    MessageQueueModule.registerAsync({
      client: {
        clientId: 'webhooks',
        brokers: ['pkc-l7pr2.ap-south-1.aws.confluent.cloud:9092'],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: 'YEIDWF6YKYBM5NXB',
          password:
            'Y5WdrZL5ZLRK4uYxvGSXEw3qG418pdB3dI6Sr/NkZ3732S4s/AYq9giZbjHcCE8t',
        },
      },
    }),
  ],
  providers: [WebhookListnerService, KafkaClient],
})
export class WebhookListnerModule implements OnApplicationBootstrap {
  constructor(private readonly webhookListnerService: WebhookListnerService) {}

  async onApplicationBootstrap() {
    this.webhookListnerService.startConsume();
  }
}
