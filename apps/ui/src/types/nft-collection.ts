import { ContractNameEnum } from '@/enums/contractName.enum';

export type NftCollection = {
  id: string;
  name: string;
  symbol: string;
  description: string;
  tokenAddress: string;
  contractType: string;
  chainId: string;
  campaignId?: string;
  benefitIds?: string[];
  createdAt: string;
  uid: string;
  defaultImageUrl?: string;
  contractName: ContractNameEnum;
};
