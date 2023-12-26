import { Benefit } from '@/types/benefit';
import { Nft } from '@/types/nft';

export type GetNftParams = {
  tokenId: string;
};

export type ClaimNftBenefitParams = {
  nftId: string;
  benefitId: string;
};

export type ClaimNftBenefitResponse = {
  id: string;
};

export type GetNftBenefitsResponse = Benefit[];

export type CreateNftParams = Partial<Omit<Nft, 'benefits' | 'claims'>> & {
  benefits: string[];
  tokenAddress: string;
  tokenId: string;
  name: string;
  imageUrl: string;
  walletAddress?: string;
};

export type CreateNftResponse = {
  id: string;
};
