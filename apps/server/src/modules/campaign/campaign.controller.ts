import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { CampaignService } from './campaign.service';
import { Campaign } from './schemas';

import { ParseObjectId } from '@/common';

@Controller('campaigns')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
  ) {

  }

  @ApiOkResponse({
    description: 'Get list campaigns with pagination',
  })
  @Get('/:id')
  public async getCampaign(
    @Param('id', ParseObjectId) id: Types.ObjectId,
  ): Promise<Campaign> {
    const foundCampaign = await this.campaignService.getCampaignById(id);
    if (!foundCampaign) {
      throw new BadRequestException('Campaign not found');
    }

    return foundCampaign;
  }
}
