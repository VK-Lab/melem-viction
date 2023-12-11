import { Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { NftCollectionService } from '../nft-collection';
import { NftScanService } from '../nft-scan/nft-scan.service';
import { NftScanEvmAsset } from '../nft-scan/interfaces/nft-scan-asset.interface';

import { NftService } from './nft.service';
import { Erc721Metadata, NftId } from './interfaces';
import { NftDetailDto } from './dtos/nft-detail.dto';

import { Auth, ParseObjectId, ReqUser } from '@/common';
import { Payload } from '@/auth';

@ApiTags('nfts')
@Controller('nfts')
export class NftController {
  constructor(
    private readonly nftService: NftService,
    private readonly nftCollectionService: NftCollectionService,
    private readonly nftScanService: NftScanService,
  ) {}

  @Get('by-uid/:uid/:tokenId/metadata')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get nft metadata',
  })
  public async getNftMetadata(@Param('uid') uid: string, @Param('tokenId') tokenId: string): Promise<Erc721Metadata> {
    const nftCollection = await this.nftCollectionService.getByUid(uid);
    if (!nftCollection) {
      throw new Error('NFT collection not found');
    }

    return this.nftService.getNftMetadata(nftCollection?.tokenAddress, tokenId);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({
    description: 'Get nfts',
  })
  public async getNfts(@ReqUser() user: Payload): Promise<NftDetailDto[]> {
    const nfts = await this.nftScanService.getAssetsByAccount(user.walletAddress);
    const nftConditions = nfts.map((nft: NftScanEvmAsset) => ({
      tokenAddress: nft.contract_address,
      tokenId: nft.token_id,
    }));

    return this.nftService.filterNftsByTokenAddressAndId(nftConditions);
  }

  @Get('/:tokenAddress/:tokenId')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({
    description: 'Get nfts',
  })
  public async getNftByTokenAddressAndId(
    @ReqUser() user: Payload,
      @Param('tokenAddress') tokenAddress: string,
      @Param('tokenId') tokenId: string,
  ): Promise<NftDetailDto> {
    const nft = await this.nftScanService.getAssetByContractAddressAndTokenId(tokenAddress, tokenId);
    if (nft.owner.toLowerCase() !== user.walletAddress.toLowerCase()) {
      throw new Error('NFT not found');
    }

    const foundNft = await this.nftService.findNftByTokenAddressAndId(tokenAddress, tokenId);

    if (!foundNft) {
      throw new Error('NFT not found');
    }

    return foundNft;
  }


  @Post(':nftId/benefits/:benefitId/claim')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({
    description: 'Claim benefit',
  })
  public async claimBenefit(
    @ReqUser() user: Payload,
      @Param('nftId', ParseObjectId) nftId: Types.ObjectId,
      @Param('benefitId', ParseObjectId) benefitId: Types.ObjectId,
  ): Promise<NftId> {
    return this.nftService.cliamBenefit(user, nftId, benefitId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get nft metadata by Id',
  })
  public async getNftMetadataById(@Param('id', ParseObjectId) id: Types.ObjectId): Promise<Erc721Metadata> {
    return this.nftService.getNftMetadataById(id);
  }

}
