import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getClaims } from '@/services/admin/claim';
import { GetClaimsResponse } from '@/services/admin/claim/types';

export const useGetClaims = (
  options?: Omit<
    UseQueryOptions<
      GetClaimsResponse,
      unknown,
      GetClaimsResponse,
      QueryKeys.CLAIMS
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(QueryKeys.CLAIMS, () => getClaims(), {
    ...options,
  });
};
