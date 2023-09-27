import { Module } from '@nestjs/common';
import { WebhookHandlersService } from './webhookHandlers.service';

@Module({
  providers: [WebhookHandlersService],
  exports: [WebhookHandlersService],
})
export class WebhookHandlerModule {}
