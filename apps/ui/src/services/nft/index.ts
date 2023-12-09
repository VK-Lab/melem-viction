import { ClaimNftBenefitParams, ClaimNftBenefitResponse } from './types';
import { Nft } from '@/types/nft';
import request from '@/utils/request';

export const getNft = (
  contractAddress: string,
  tokenId: string
): Promise<Nft> => {
  return request.get(`/nfts/${contractAddress}/${tokenId}`);
};

export const getNfts = (): Promise<Nft[]> => {
  return request.get(`/nfts`);
};

export const claimNftBenefit = ({
  nftId,
  benefitId,
}: ClaimNftBenefitParams): Promise<ClaimNftBenefitResponse> => {
  return request.post(`/nfts/${nftId}/benefits/${benefitId}/claim`);
};
