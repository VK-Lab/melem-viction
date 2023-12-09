import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { claimNftBenefit } from '@/services/nft';
import {
  ClaimNftBenefitParams,
  ClaimNftBenefitResponse,
} from '@/services/nft/types';

export const useMutateClaimBenefit = (
  options?: UseMutationOptions<
    ClaimNftBenefitResponse,
    unknown,
    ClaimNftBenefitParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: claimNftBenefit,
    mutationKey: MutationKeys.CLAIM_NFT_BENEFIT,
  });
};
