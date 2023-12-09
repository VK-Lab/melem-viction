import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getCampaigns } from '@/services/admin/campaign';
import { GetCampaignsResponse } from '@/services/admin/campaign/types';

export const useGetAllCampaigns = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetCampaignsResponse,
      [QueryKeys.CAMPAIGNS]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.CAMPAIGNS], () => getCampaigns(), {
    ...options,
  });
};
