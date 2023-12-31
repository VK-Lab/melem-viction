export enum PrivatePaths {
  USER_COLLECTION = '/user',
  NFT_DETAIL = '/nfts/[tokenAddress]',
}

export enum AdminPaths {
  HOME = '/admin',
  DASHBOARD = '/admin/campaigns',
  CLAIMS = '/admin/claims',
  BENEFITS = '/admin/benefits',
  CAMPAIGNS = '/admin/campaigns',
  CREATE_CAMPAIGN = '/admin/campaigns/create',
  NFTS = '/admin/nfts',
  NFT_COLLECTIONS = '/admin/nft-collections',
}

export enum PublicPaths {
  AUTH_WALLET = '/auth-wallet',
  WELCOME = '/welcome',
  ADMIN = '/admin',
  HOME = '/',
  CAMPAIGNS = '/campaigns',
  CAMPAIGN_DETAIL = '/campaigns/[id]',
}

export const Paths = {
  ...PrivatePaths,
  ...PublicPaths,
};

export type Paths = PrivatePaths | PublicPaths | AdminPaths;
