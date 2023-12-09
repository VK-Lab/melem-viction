import { Nft } from '@/types/nft';

export type GetNftsParams = {
  limit: number;
  page: number;
};

export type GetNftsResponse = {
  items: Nft[];
  total: number;
};

export type UpdateNftParams = {
  id: string;
  name: string;
  description: string;
  benefits: string[];
};

export type UpdateNftResponse = {
  id: string;
};

export type CreateNftParams = Partial<Omit<Nft, 'benefits' | 'claims'>> & {
  benefits: string[];
  tokenAddress: string;
  tokenId: string;
  name: string;
  imageUrl: string;
};

export type CreateNftResponse = {
  id: string;
};

export type BatchCreateNftsParams = {
  nfts: CreateNftParams[];
};

export type BatchCreateNftsResponse = CreateNftResponse[];
