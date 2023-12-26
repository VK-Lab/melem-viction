import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CampaignService } from './campaign.service';
import { Campaign, CampaignSchema } from './schemas';
import { CampaignController } from './campaign.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Campaign.name, schema: CampaignSchema }]),
  ],
  providers: [CampaignService],
  controllers: [CampaignController],
  exports: [CampaignService],
})
export class CampaignModule {}
