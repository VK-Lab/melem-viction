import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { getMyProfile } from '@/services/user';
import { GetMyProfileResponse } from '@/services/user/types';

export const useGetMyProfile = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetMyProfileResponse,
      [QueryKeys.MY_PROFILE]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.MY_PROFILE], () => getMyProfile(), {
    ...options,
  });
};
