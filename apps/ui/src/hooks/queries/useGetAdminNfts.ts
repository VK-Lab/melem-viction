import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getNfts } from '@/services/admin/nft';
import { GetNftsResponse } from '@/services/admin/nft/types';

export const useGetAdminNfts = (
  options?: Omit<
    UseQueryOptions<
      GetNftsResponse,
      unknown,
      GetNftsResponse,
      [QueryKeys.LIST_NFTS]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.LIST_NFTS], () => getNfts(), {
    ...options,
  });
};
