import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getNft } from '@/services/nft';
import { Nft } from '@/types/nft';

type Props = {
  tokenAddress: string;
  tokenId: string;
};

export const useGetNft = (
  { tokenAddress, tokenId }: Props,
  options: Omit<
    UseQueryOptions<unknown, unknown, Nft, Array<string>>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeys.NFT, tokenAddress, tokenId],
    () => getNft(tokenAddress, tokenId),
    {
      ...options,
    }
  );
};
