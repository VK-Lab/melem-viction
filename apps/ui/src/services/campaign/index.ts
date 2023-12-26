import { Campaign } from '@/types/campaign';
import request from '@/utils/request';

export const getCampaign = (id: string): Promise<Campaign> => {
  return request.get(`/campaigns/${id}`);
};
