import { Benefit } from '@/types/benefit';

export type GetBenefitsParams = {
  limit: number;
  page: number;
};

export type GetBenefitsResponse = {
  items: Benefit[];
  total: number;
};

export type CreateBenefitParams = Partial<Benefit>;

export type CreateBenefitResponse = Benefit;
