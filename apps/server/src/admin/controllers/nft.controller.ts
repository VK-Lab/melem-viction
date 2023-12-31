import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { BatchCreateNftsDto, CreateNftDto, GetNftsDto, UpdateNftDto } from '@/admin/dtos';
import { AdminNftService } from '@/admin/services';
import { Auth, ListDto, ParseObjectId, ReqUser } from '@/common';
import { IdDto } from '@/common/dtos/id.dto';
import { Nft } from '@/modules/nft';
import { Payload } from '@/auth';

@Controller('admin/nfts')
@ApiTags('admin/nfts')
export class AdminNftController {
  constructor(
    private readonly adminNftService: AdminNftService,
  ) {}

  @ApiOkResponse({
    description: 'Get list nfts with pagination',
    type: ListDto<Nft>,
  })
  @Get('/')
  @Auth()
  public async getNfts(
    @ReqUser() user: Payload,
      @Query() getNftsDto: GetNftsDto): Promise<ListDto<Nft>> {
    return this.adminNftService.getNfts({
      createdBy: user.userId,
    }, getNftsDto);
  }

  @Put(':id')
  @Auth()
  public async updateNft(@Param('id', ParseObjectId) id: Types.ObjectId, @Body() updateNftDto: UpdateNftDto): Promise<IdDto> {
    return this.adminNftService.updateNft(id, updateNftDto);
  }

  @Post('/')
  @Auth()
  public async createNft(
    @ReqUser() user: Payload,
      @Body() createNftDto: CreateNftDto): Promise<IdDto> {
    return this.adminNftService.createNft({
      ...createNftDto,
      createdBy: user.userId,
    });
  }

  @Post('/batchCreate')
  @Auth()
  public async batchCreate(@Body() batchCreateNftsDto: BatchCreateNftsDto): Promise<IdDto[]> {
    return this.adminNftService.batchCreateNftsDto(batchCreateNftsDto);
  }
}
