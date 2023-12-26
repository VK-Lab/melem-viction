import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AdminBenefitService } from '../services';
import { CreateBenefitDto, GetBenefitsDto } from '../dtos';

import { Auth, ListDto, ReqUser } from '@/common';
import { Benefit } from '@/modules/benefit';
import { Payload } from '@/auth';

@Controller('admin/benefits')
@ApiTags('admin/benefits')
export class AdminBenefitController {
  constructor(private readonly adminBenefitService: AdminBenefitService) {}

  @ApiOkResponse({
    description: 'Get list benefits with pagination',
    type: ListDto<Benefit>,
  })
  @Get('/')
  @Auth()
  public async getBenefits(
    @ReqUser() user: Payload,
      @Query() getBenefitsDto: GetBenefitsDto): Promise<ListDto<Benefit>> {
    return this.adminBenefitService.getBenefits(user.userId, getBenefitsDto);
  }

  @ApiOkResponse({
    description: 'Create benefit',
    type: Benefit,
  })
  @Post('/')
  @Auth()
  public async createBenefit(@ReqUser() user: Payload, @Body() createBenefitDto: CreateBenefitDto): Promise<Benefit> {
    return this.adminBenefitService.createBenefit(user.userId, createBenefitDto);
  }
}
