import { vicTestNet } from './chains';

export const Config = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || vicTestNet.id),
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.d2egroup.com/v1',
  metadataBaseUrl: 'https://api.d2egroup.com/v1/nfts',
};
