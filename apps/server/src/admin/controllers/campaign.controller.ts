import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { AdminCampaignService } from '../services';
import { CreateCampaignDto, GetCampaignsDto, UpdateCampaignDto } from '../dtos';

import { Auth, ListDto, ParseObjectId, ReqUser } from '@/common';
import { Benefit } from '@/modules/benefit';
import { Payload } from '@/auth';
import { Campaign } from '@/modules/campaign';
import { IdDto } from '@/common/dtos/id.dto';

@Controller('admin/campaigns')
@ApiTags('admin/campaigns')
export class AdminCampaignController {
  constructor(
    private readonly adminCampaignService: AdminCampaignService) {}

  @ApiOkResponse({
    description: 'Get list campaigns with pagination',
    type: ListDto<Benefit>,
  })
  @Get('/')
  @Auth()
  public async getCampaigns(
    @ReqUser() user: Payload,
      @Query() getCampaignsDto: GetCampaignsDto): Promise<ListDto<Campaign>> {
    return this.adminCampaignService.getCampaigns(user.userId, getCampaignsDto);
  }

  @ApiOkResponse({
    description: 'Create campaign',
    type: Benefit,
  })
  @Post('/')
  @Auth()
  public async createCampaign(@ReqUser() user: Payload, @Body() createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    return this.adminCampaignService.createCampaign(user.userId, createCampaignDto);
  }

  @Put(':id')
  @Auth()
  public async updateCampaign(@Param('id', ParseObjectId) id: Types.ObjectId, @Body() updateNftDto: UpdateCampaignDto): Promise<IdDto> {
    return this.adminCampaignService.updateCampaign(id, updateNftDto);
  }
}
