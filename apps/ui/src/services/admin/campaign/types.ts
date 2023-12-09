import { Campaign } from '@/types/campaign';

export type GetCampaignsParams = {
  limit: number;
  page: number;
};

export type GetCampaignsResponse = {
  items: Campaign[];
  total: number;
};

export type UpdateCampaignParams = {
  id: string;
  name: string;
  description: string;
  nftCollectionIds: string[];
};

export type UpdateCampaignResponse = {
  id: string;
};

export type CreateCampaignParams = Omit<UpdateCampaignParams, 'id'> & {
  nftCollectionIds: string[];
};

export type CreateCampaignResponse = {
  id: string;
};
