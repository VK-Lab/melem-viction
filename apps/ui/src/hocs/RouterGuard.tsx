import { useState, useEffect, useCallback } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

import { AdminPaths, PublicPaths } from '@/enums/paths.enum';
import { checkUser } from '@/services/auth';
import { User } from '@/types/user';
import { isAdmin } from '@/utils/permission';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RouterGuard = ({ children }: { children: any }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const authCheck = useCallback(
    (url: string) => {
      // redirect to login page if accessing a private page and not logged in
      const publicPaths: string[] = Object.values(PublicPaths);
      const path = url.split('?')[0];
      if (publicPaths.includes(path) || url.startsWith('/campaigns/')) {
        setAuthorized(true);

        return;
      }

      const adminPaths: string[] = Object.values(AdminPaths);

      checkUser()
        .then((user: User) => {
          if (isAdmin(user)) {
            setAuthorized(true);

            return;
          }

          if (!adminPaths.includes(path)) {
            setAuthorized(true);

            return;
          }

          setAuthorized(false);
          router.push({
            pathname: PublicPaths.HOME,
          });
        })
        .catch(() => {
          setAuthorized(false);
          router.push({
            pathname: PublicPaths.HOME,
          });
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [router]
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!authorized) {
    return (
      <Box width="100%" height="100vh" position="relative">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return children;
};

export default RouterGuard;
