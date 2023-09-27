import { KafkaClient } from '@afflr/message-queue';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WebhookListnerService {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: KafkaClient,
  ) {}

  async startConsume() {
    const consumingTopics = ['app_uninstalled', 'shop_update'];
    const groupId = 'webhook-GID';

    // client consume
    await this.kafkaClient.consume(
      {
        topics: consumingTopics,
        fromBeginning: false,
      },
      groupId,
      this.consumingEvents,
    );
  }

  async consumingEvents(event: any[]): Promise<void> {
    event.map((msg) => {
      console.log(msg);
    });
  }
}
