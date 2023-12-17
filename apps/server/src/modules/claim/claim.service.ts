import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateWriteOpResult } from 'mongoose';

import { Claim, ClaimDocument } from './schemas';
import { CreateClaimDto } from './dtos';

import { ListDto, PaginationDto } from '@/common';

@Injectable()
export class ClaimService {
  constructor(@InjectModel(Claim.name) private claimModel: Model<ClaimDocument>) {}

  public async createClaim(userId: Types.ObjectId, createClaimDto: CreateClaimDto): Promise<Claim> {
    try {
      const createdClaim = await this.claimModel.create({
        ...createClaimDto,
        createdBy: userId,
      });

      return createdClaim;
    } catch (err) {
      throw new BadRequestException('somethings_went_wrong');
    }
  }

  public async getClaims(filterQuery: FilterQuery<Claim>, { page, limit, sortBy, orderBy }: PaginationDto): Promise<ListDto<Claim>> {
    const claims =  await this.claimModel.aggregate([
      { $sort: { [sortBy]: orderBy } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: 'users', // replace with the actual collection name for 'createdBy'
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      {
        $unwind: '$createdBy',
      },
      {
        $lookup: {
          from: 'benefits', // replace with the actual collection name for 'benefit'
          localField: 'benefitId',
          foreignField: '_id',
          as: 'benefit',
        },
      },
      {
        $unwind: '$benefit',
      },
      {
        $lookup: {
          from: 'nfts', // replace with the actual collection name for 'nft'
          localField: 'nftId',
          foreignField: '_id',
          as: 'nft',
        },
      },
      {
        $unwind: '$nft',
      },
      { $match: filterQuery },
      {
        $project: {
          '_id': 1,
          'id': '$_id',
          'createdBy.walletAddress': 1,
          'benefit._id': 1,
          'benefit.name': 1,
          'nft._id': 1,
          'nft.name': 1,
          'nft.tokenAddress': 1,
          'nft.tokenId': 1,
          'status': 1,
        },
      },
    ]);
    return {
      items: claims,
      total: await this.claimModel.countDocuments(),
    };
  }

  public async updateClaimStatus(id: Types.ObjectId, { status }: Partial<Claim>): Promise<UpdateWriteOpResult> {
    return this.claimModel.updateOne({
      _id: id,
    }, {
      status,
    });
  }
}
