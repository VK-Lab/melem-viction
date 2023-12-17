import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { AdminCampaignService, AdminClaimService, AdminNftCollectionService } from '../services';
import { GetClaimsDto, UpdateClaimStatusDto } from '../dtos';

import { Auth, ListDto, ParseObjectId, ReqUser, RoleEnum } from '@/common';
import { Claim } from '@/modules/claim';
import { IdDto } from '@/common/dtos/id.dto';
import { Payload } from '@/auth';
import { Campaign } from '@/modules/campaign';
import { NftCollection } from '@/modules/nft-collection';

@Controller('admin/claims')
@ApiTags('admin/claims')
export class AdminClaimController {
  constructor(
    private readonly adminClaimService: AdminClaimService,
    private readonly adminNftCollectionService: AdminNftCollectionService,
  ) {}

  @ApiOkResponse({
    description: 'Get list nfts with pagination',
    type: ListDto<Claim>,
  })
  @Get('/')
  @Auth(RoleEnum.ADMIN)
  public async getClaims(
    @ReqUser() user: Payload,
      @Query() getClaimsDto: GetClaimsDto,
  ): Promise<ListDto<Claim>> {
    const nftCollections = await this.adminNftCollectionService.getNftCollectionsByUser(user.userId);
    return this.adminClaimService.getClaims({
      'nft.tokenAddress': {
        $in: nftCollections.map((nftCollection: NftCollection) => nftCollection.tokenAddress),
      },
    }, getClaimsDto);
  }

  @Put(':id/status')
  @Auth(RoleEnum.ADMIN)
  public async updateClaimStatus(
    @Param('id', ParseObjectId) id: Types.ObjectId, @Body() updateClaimStatusDto: UpdateClaimStatusDto): Promise<IdDto> {
    return this.adminClaimService.updateClaimStatus(id, updateClaimStatusDto);
  }
}
