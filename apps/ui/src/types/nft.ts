import { Benefit } from './benefit';
import { ClaimStatusEnum } from './claim';

export type NftMetadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  background_color: string;
};

export type Nft = {
  _id: string;
  tokenHash: string;
  benefits: Benefit[];
  claims: NftClaim[];
  createdAt: string;
  description: string;
  imageUrl: string;
  name: string;
  tokenAddress: string;
  tokenId: string;
  updatedAt: string;
  contractType: string;
  id: string;
  ownerOf: string;
};

export type NftClaim = {
  benefitId: string;
  status: ClaimStatusEnum;
};

export type EvmNft = {
  tokenAddress: string;
  tokenId: string;
  contractType: string;
  ownerOf: string;
  blockNumber: string;
  blockNumberMinted: string;
  tokenUri?: string | undefined;
  metadata?: NftMetadata;
  amount?: string | undefined;
  name: string;
  symbol: string;
  tokenHash: string;
  lastTokenUriSync: string;
  lastMetadataSync: string;
};
