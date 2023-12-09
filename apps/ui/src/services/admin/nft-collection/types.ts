import { NftCollection } from '@/types/nft-collection';

export type GetNftCollectionsParams = {
  limit?: number;
  page?: number;
  campaignId?: string;
};

export type GetNftCollectionsResponse = {
  items: NftCollection[];
  total: number;
};

export type UpdateNftCollectionParams = {
  id: string;
  name: string;
  description: string;
  benefitIds: string[];
};

export type UpdateNftCollectionResponse = {
  id: string;
};

export type CreateNftCollectionParams = Partial<NftCollection> & {
  name: string;
};

export type CreateNftCollectionResponse = {
  id: string;
};
