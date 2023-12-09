import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { CookieKeys } from '@/enums/cookieKeys.enum';
import { PublicPaths } from '@/enums/paths.enum';
import { logout } from '@/services/auth';

export const useMutateLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    mutationKey: 'logout',
    onMutate: () => {
      Cookies.remove(CookieKeys.TOKEN);
      router.push(PublicPaths.HOME);
    },
  });
};
