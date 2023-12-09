import urlJoin from 'url-join';

import { Config } from '@/config';

export const generateMetadataUrl = (tokenAddress: string, tokenId: string) => {
  return urlJoin(Config.metadataBaseUrl, tokenAddress, tokenId, 'metadata');
};
