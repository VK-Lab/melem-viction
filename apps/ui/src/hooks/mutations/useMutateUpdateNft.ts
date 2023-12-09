import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { updateNft } from '@/services/admin/nft';
import { UpdateNftParams, UpdateNftResponse } from '@/services/admin/nft/types';

export const useMutateUpdateNft = (
  options?: UseMutationOptions<
    UpdateNftResponse,
    unknown,
    UpdateNftParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateNft,
    mutationKey: MutationKeys.UPDATE_NFT,
  });
};
