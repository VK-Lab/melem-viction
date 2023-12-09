import { useQuery, UseQueryOptions } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { checkPhoneVerfied } from '@/services/auth';
import { CheckPhoneVerfiedResponse } from '@/services/auth/types';

export const useCheckPhoneVerfied = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      CheckPhoneVerfiedResponse,
      [QueryKeys.CHECK_PHONE_VERFIED]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.CHECK_PHONE_VERFIED], () => checkPhoneVerfied(), {
    ...options,
  });
};
