import { Benefit } from './benefit';
import { Nft } from './nft';
import { User } from './user';

export enum ClaimStatusEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export type Claim = {
  nftId: string;
  benefitId: string;
  createdBy: User;
  status: ClaimStatusEnum;
  createdAt: string;
  updatedAt: string;
  id: string;
  nft?: Nft;
  benefit: Benefit;
};
