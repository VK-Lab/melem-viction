import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { AdminNftCollectionService } from '../services';
import { CreateNftCollectionDto, GetNftCollectionsDto, UpdateNftCollectionDto } from '../dtos';

import { Auth, ListDto, ParseObjectId, ReqUser } from '@/common';
import { IdDto } from '@/common/dtos/id.dto';
import { Nft } from '@/modules/nft';
import { NftCollection } from '@/modules/nft-collection';
import { Payload } from '@/auth';

@Controller('admin/nft-collections')
@ApiTags('admin/nft-collections')
export class AdminNftCollectionController {
  constructor(private readonly adminNftCollectionService: AdminNftCollectionService) {}

  @ApiOkResponse({
    description: 'Get list nft-collections with pagination',
    type: ListDto<Nft>,
  })
  @Get('/')
  @Auth()
  public async getNftCollections(
    @ReqUser() user: Payload,
      @Query() getNftCollectionsDto: GetNftCollectionsDto): Promise<ListDto<NftCollection>> {
    return this.adminNftCollectionService.getNftCollections(user.userId, getNftCollectionsDto);
  }

  @Put(':id')
  @Auth()
  public async updateNftCollection(
    @Param('id', ParseObjectId) id: Types.ObjectId, @Body() updateNftCollectionDto: UpdateNftCollectionDto): Promise<IdDto> {
    return this.adminNftCollectionService.updateNftCollection(id, updateNftCollectionDto);
  }

  @Post('/')
  @Auth()
  public async createNftCollection(@ReqUser() user: Payload, @Body() createNftCollectionDto: CreateNftCollectionDto): Promise<IdDto> {
    return this.adminNftCollectionService.createNftCollection({
      ...createNftCollectionDto,
      createdBy: user.userId,
    });
  }
}
