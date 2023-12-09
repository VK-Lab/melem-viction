import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { batchCreateNfts } from '@/services/admin/nft';
import { BatchCreateNftsParams } from '@/services/admin/nft/types';

export const useMutateBatchCreateNfts = (
  options?: UseMutationOptions<unknown, unknown, BatchCreateNftsParams, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: batchCreateNfts,
    mutationKey: MutationKeys.BATCH_CREATE_NFTS,
  });
};
