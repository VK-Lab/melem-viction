import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateWriteOpResult } from 'mongoose';
import { customAlphabet } from 'nanoid';

import { WooCommerceService } from '../@core/woocommerce';
import { BeneiftSourceEnum } from '../benefit/enums/benefit-source.enum';

import { Claim, ClaimDocument } from './schemas';
import { CreateClaimDto } from './dtos';

import { ClaimStatusEnum, ListDto, PaginationDto } from '@/common';

@Injectable()
export class ClaimService {
  constructor(
    @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
    private readonly wooCommerceService: WooCommerceService,
  ) {}

  public async findById(id: Types.ObjectId): Promise<Claim | null> {
    return this.claimModel.findById(id).populate('benefit', '_id name source amount');
  }

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
    let generatedCode = undefined;
    const claim = await this.findById(id);
    const { source, amount = 0 } = claim?.benefit || { amount: 0 };

    if (source === BeneiftSourceEnum.WOOCOMMERCE && status === ClaimStatusEnum.ACCEPTED) {
      const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 6);
      const data = await this.wooCommerceService.createCoupon({
        code: nanoid().toUpperCase(),
        discount_type: 'percent',
        amount: `${amount}`,
        individual_use: true,
        exclude_sale_items: true,
      });

      generatedCode = data.code;
    }

    const result = await this.claimModel.updateOne({
      _id: id,
    }, {
      status,
      generatedCode,
    });

    return result;
  }
}
