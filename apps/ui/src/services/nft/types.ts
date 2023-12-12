import { Benefit } from '@/types/benefit';

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
