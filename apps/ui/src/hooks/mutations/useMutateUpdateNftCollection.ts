import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { updateNftCollection } from '@/services/admin/nft-collection';
import {
  UpdateNftCollectionParams,
  UpdateNftCollectionResponse,
} from '@/services/admin/nft-collection/types';

export const useMutateUpdateNftCollection = (
  options?: UseMutationOptions<
    UpdateNftCollectionResponse,
    unknown,
    UpdateNftCollectionParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateNftCollection,
    mutationKey: MutationKeys.UPDATE_NFT_COLLECTION,
  });
};
