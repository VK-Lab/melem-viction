import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { updateClaimStatus } from '@/services/admin/claim';
import {
  UpdateClaimParams,
  UpdateClaimStatusResponse,
} from '@/services/admin/claim/types';

export const useMutateUpdateClaimStatus = (
  options?: UseMutationOptions<
    UpdateClaimStatusResponse,
    unknown,
    UpdateClaimParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateClaimStatus,
    mutationKey: MutationKeys.UPDATE_CLAIM_STATUS,
  });
};
