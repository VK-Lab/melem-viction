import { QueryClient, useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getCampaign } from '@/services/campaign';
import { Campaign } from '@/types/campaign';

export const useGetCampaign = (
  id: string,
  options?: Omit<
    UseQueryOptions<unknown, unknown, Campaign, [QueryKeys.CAMPAIGNS, string]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.CAMPAIGNS, id], () => getCampaign(id), {
    ...options,
    enabled: !!id,
  });
};

export const prefetchGetCampaign = async (id: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.CAMPAIGNS, id],
    queryFn: () => getCampaign(id),
  });

  return queryClient;
};
