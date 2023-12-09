import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { createCampaign } from '@/services/admin/campaign';
import {
  CreateCampaignParams,
  CreateCampaignResponse,
} from '@/services/admin/campaign/types';

export const useMutateCreateCampaign = (
  options?: UseMutationOptions<
    CreateCampaignResponse,
    unknown,
    CreateCampaignParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createCampaign,
    mutationKey: MutationKeys.CREATE_CAMPAIGN,
  });
};
