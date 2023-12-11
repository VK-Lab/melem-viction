import { vicTestNet } from './chains';

export const Config = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || vicTestNet.id),
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_URL || 'https://api-viction.melem.io/v1',
  metadataBaseUrl:
    process.env.NEXT_PUBLIC_META_DATA_BASE_URL ||
    'https://api-viction.melem.io/v1/nfts/by-uid',
};
