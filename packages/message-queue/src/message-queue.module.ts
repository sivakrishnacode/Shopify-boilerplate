import { DynamicModule, Provider } from '@nestjs/common';
import { KafkaClient } from './clients/kafka-client';

export class MessageQueueModule {
  static registerAsync(config: any): DynamicModule {
    const kafka = new KafkaClient(config);

    const kafkaProvider: Provider = {
      provide: 'KAFKA_CLIENT',
      useValue: kafka,
    };

    return {
      module: MessageQueueModule,
      providers: [kafkaProvider],
      exports: [kafkaProvider],
      global: true,
    };
  }
}
