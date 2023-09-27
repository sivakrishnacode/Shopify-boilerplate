import { Module } from '@nestjs/common';
import { Gdpr } from '@/helper/gdpr.service';

@Module({
  imports: [],
  providers: [Gdpr],
  exports: [Gdpr],
})
export class HelperModule {}
