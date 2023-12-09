import { Benefit } from './benefit';
import { NftCollection } from './nft-collection';

export type Campaign = {
  id: string;
  name: string;
  description: string;
  benefits: Benefit[];
  createdAt: string;
  nftCollectionIds: string[];
  benefitIds: string[];
  nftCollections: NftCollection[];
};
