import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getNftBenefits } from '@/services/nft';
import { GetNftBenefitsResponse } from '@/services/nft/types';

export const useGetNftBenefits = (
  { nftId }: { nftId?: string },
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetNftBenefitsResponse,
      [QueryKeys.NFT, string | undefined, 'benefits']
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeys.NFT, nftId, 'benefits'],
    () => getNftBenefits(nftId),
    {
      ...options,
      enabled: !!nftId,
    }
  );
};
