import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getBenefits } from '@/services/admin/benefit';
import { GetBenefitsResponse } from '@/services/admin/benefit/types';

export const useGetBenefits = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetBenefitsResponse,
      [QueryKeys.BENEFITS]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.BENEFITS], () => getBenefits(), {
    ...options,
  });
};
