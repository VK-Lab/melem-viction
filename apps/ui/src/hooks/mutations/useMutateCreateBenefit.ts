import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { createBenefit } from '@/services/admin/benefit';
import {
  CreateBenefitParams,
  CreateBenefitResponse,
} from '@/services/admin/benefit/types';

export const useMutateCreateBenefit = (
  options?: UseMutationOptions<
    CreateBenefitResponse,
    unknown,
    CreateBenefitParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createBenefit,
    mutationKey: MutationKeys.CREATE_BENEFIT,
  });
};
