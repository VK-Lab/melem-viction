export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type CnvLoyaltyUser = {
  firstName: string;
  lastName: string;
};

export type User = {
  walletAddress: string;
  phoneNumber: string;
  roles: RoleEnum[];
  cnvLoyaltyUser?: CnvLoyaltyUser;
};
