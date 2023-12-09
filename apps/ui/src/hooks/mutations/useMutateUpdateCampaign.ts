import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { updateCampaign } from '@/services/admin/campaign';
import {
  UpdateCampaignParams,
  UpdateCampaignResponse,
} from '@/services/admin/campaign/types';

export const useMutateUpdateCampaign = (
  options?: UseMutationOptions<
    UpdateCampaignResponse,
    unknown,
    UpdateCampaignParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateCampaign,
    mutationKey: MutationKeys.UPDATE_CAMPAIGN,
  });
};
