import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateWriteOpResult } from 'mongoose';

import { Campaign, CampaignDocument } from './schemas';

import { ListDto, PaginationDto } from '@/common';

@Injectable()
export class CampaignService {
  constructor(@InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>) {}

  public async findById(id: Types.ObjectId): Promise<Campaign | null> {
    return this.campaignModel.findById(id);
  }

  public async createCampaign(campaign: Partial<Campaign>): Promise<Campaign> {
    return this.campaignModel.create(campaign);
  }

  public async findCampaignsByUser(userId: Types.ObjectId): Promise<Campaign[]> {
    return this.campaignModel.find({ createdBy: userId });
  }

  public async getCampaignById(id: Types.ObjectId): Promise<Campaign | null> {
    return this.campaignModel.findById(id).populate('nftCollections', 'id name tokenAddress defaultImageUrl');
  }

  public async getCampaigns(
    filterQuery: FilterQuery<Campaign>,
    { page, limit, sortBy, orderBy }: PaginationDto): Promise<ListDto<Campaign>> {
    const campaigns = await this.campaignModel
      .find(filterQuery)
      .sort({
        [sortBy]: orderBy,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('nftCollections', 'id name');

    return {
      items: campaigns,
      total: await this.campaignModel.countDocuments(),
    };
  }

  public async updateCampaign(id: Types.ObjectId, campaign: Omit<Partial<Campaign>, '_id'>): Promise<UpdateWriteOpResult> {
    return this.campaignModel.updateOne({ _id: id }, campaign);
  }
}
