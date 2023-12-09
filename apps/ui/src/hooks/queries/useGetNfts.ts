import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getNfts } from '@/services/nft';
import { Nft } from '@/types/nft';

export const useGetNfts = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, Nft[], QueryKeys.LIST_NFTS>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(QueryKeys.LIST_NFTS, () => getNfts(), {
    ...options,
  });
};
