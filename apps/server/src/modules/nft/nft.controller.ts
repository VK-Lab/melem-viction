import { BadRequestException, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import _ from 'lodash';

import { NftCollectionService } from '../nft-collection';
import { NftScanService } from '../nft-scan/nft-scan.service';
import { NftScanEvmAsset } from '../nft-scan/interfaces/nft-scan-asset.interface';
import { BenefitDocument } from '../benefit';

import { NftService } from './nft.service';
import { Erc721Metadata, NftId } from './interfaces';
import { NftDetailDto } from './dtos/nft-detail.dto';
import { NftBenefit } from './interfaces/nft-benefit.interface';

import { Auth, ClaimStatusEnum, ParseObjectId, ReqUser } from '@/common';
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

  @Get('/:id/benefits')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({
    description: 'Get nft benefits',
  })
  public async getNftBenefits(
    @ReqUser() user: Payload,
      @Param('id', ParseObjectId) id: Types.ObjectId,
  ): Promise<NftBenefit[]> {
    const foundNft = await this.nftService.findByIdAndPopulatedBenefits(id);
    if (!foundNft) {
      throw new BadRequestException('NFT not found');
    }
    const evmNft = await this.nftScanService.getAssetByContractAddressAndTokenId(foundNft.tokenAddress, foundNft.tokenId);

    if (evmNft.owner.toLowerCase() !== user.walletAddress.toLowerCase()) {
      throw new ForbiddenException('Owned by another user');
    }

    return <NftBenefit[]><unknown>_.map(this.nftService.getAllBenefitsWithCollection(foundNft), (benefit: BenefitDocument): NftBenefit => ({
      ...benefit.toJSON(),
      claimStatus: _.get(_.find(foundNft.claims, { benefitId: benefit._id }), 'status', ClaimStatusEnum.READY),
    }));
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
    return this.nftService.claimBenefit(user, nftId, benefitId);
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
