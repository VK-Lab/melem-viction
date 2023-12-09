import { useMutation, UseMutationOptions } from 'react-query';

import { checkUser } from '@/services/auth';
import { CheckUserResponse } from '@/services/auth/types';

export const useMutateCheckUser = (
  options?: UseMutationOptions<CheckUserResponse, unknown, void, unknown>
) => {
  return useMutation({
    mutationFn: checkUser,
    mutationKey: 'checkUser',
    ...options,
  });
};
