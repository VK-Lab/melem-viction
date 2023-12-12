import { ClaimStatusEnum } from './claim';

export type Benefit = {
  id: string;
  name: string;
  description: string;
  claimStatus: ClaimStatusEnum;
};
