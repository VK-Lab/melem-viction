import urlJoin from 'url-join';

import { Config } from '@/config';

export const generateMetadataUrl = (uid: string, tokenId: string) => {
  return urlJoin(Config.metadataBaseUrl, uid, tokenId, 'metadata');
};

export const generateMetadataBaseUrl = (uid: string) => {
  return urlJoin(Config.metadataBaseUrl, uid);
};
