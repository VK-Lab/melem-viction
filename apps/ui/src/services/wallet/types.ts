import { Nft } from '@/types/nft';

export type GetWalletNftsResponse = {
  total: number;
  page: number;
  page_size: number;
  cursor: string;
  result: Nft[];
};

export type GetWalletNftsParams = {
  cursor: string;
  limit: number;
};
