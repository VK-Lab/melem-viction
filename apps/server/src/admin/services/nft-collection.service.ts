import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { GetNftCollectionsDto, UpdateNftCollectionDto } from '../dtos';

import { IdDto } from '@/common/dtos/id.dto';
import { ListDto } from '@/common';
import { NftCollection, NftCollectionService } from '@/modules/nft-collection';

@Injectable()
export class AdminNftCollectionService {
  constructor(
    private readonly nftCollectionService: NftCollectionService) {
  }

  public async getNftCollections(userId: Types.ObjectId, getNftCollectionsDto: GetNftCollectionsDto): Promise<ListDto<NftCollection>> {
    return this.nftCollectionService.findNftCollections({
      ...getNftCollectionsDto,
      createdBy: userId,
    });
  }

  public async getNftCollectionsByUser(userId: Types.ObjectId): Promise<NftCollection[]> {
    return this.nftCollectionService.getByUserId(userId);
  }

  public async updateNftCollection(id: Types.ObjectId, updateNftCollectionDto: UpdateNftCollectionDto): Promise<IdDto> {
    const result = await this.nftCollectionService.updateNftCollection(id, updateNftCollectionDto);

    if (result.modifiedCount === 0) {
      throw new BadRequestException('can_not_update_nft_collection');
    }

    return {
      id: id.toString(),
    };
  }

  public async createNftCollection(createNftCollectionDto: Partial<NftCollection>): Promise<IdDto> {
    const createdNftCollectio = await this.nftCollectionService.createNftCollection(createNftCollectionDto);

    return {
      id: createdNftCollectio._id.toString(),
    };
  }
}
