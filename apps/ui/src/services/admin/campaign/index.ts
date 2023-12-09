import {
  CreateCampaignParams,
  CreateCampaignResponse,
  GetCampaignsParams,
  GetCampaignsResponse,
  UpdateCampaignParams,
  UpdateCampaignResponse,
} from './types';
import request from '@/utils/request';

export const getCampaigns = (
  params?: GetCampaignsParams
): Promise<GetCampaignsResponse> => {
  return request.get('/admin/campaigns', {
    params,
  });
};

export const updateCampaign = ({
  id,
  ...rest
}: UpdateCampaignParams): Promise<UpdateCampaignResponse> => {
  return request.put(`/admin/campaigns/${id}`, rest);
};

export const createCampaign = (
  params: CreateCampaignParams
): Promise<CreateCampaignResponse> => {
  return request.post('/admin/campaigns', params);
};
