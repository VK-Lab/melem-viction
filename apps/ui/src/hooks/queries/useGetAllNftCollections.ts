import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getNftCollections } from '@/services/admin/nft-collection';
import {
  GetNftCollectionsParams,
  GetNftCollectionsResponse,
} from '@/services/admin/nft-collection/types';

export const useGetAllNftCollections = (
  query: Partial<GetNftCollectionsParams> = {},
  options: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetNftCollectionsResponse,
      QueryKeys.NFT_COLLECTIONS
    >,
    'queryKey' | 'queryFn'
  > = {}
) => {
  return useQuery(QueryKeys.NFT_COLLECTIONS, () => getNftCollections(query), {
    ...options,
  });
};
