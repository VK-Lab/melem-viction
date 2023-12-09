import React from 'react';

import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { StyledButton } from './styled';
import { Config } from '@/config';
import { CookieKeys } from '@/enums/cookieKeys.enum';
import { AdminPaths } from '@/enums/paths.enum';
import useSignIn from '@/hooks/useSignIn';
import { LoginResponse } from '@/services/auth/types';

const AdminLoginButton = () => {
  const router = useRouter();

  const onLoginSuccess = (data: LoginResponse) => {
    Cookies.set(CookieKeys.TOKEN, data.accessToken);
    router.push(AdminPaths.DASHBOARD);
  };
  const { handleSignIn, connect, address, isConnected, activeChain } =
    useSignIn({
      onLoginSuccess,
      defaultChainId: Config.chainId,
    });

  return (
    <Box>
      {isConnected ? (
        <StyledButton
          variant="contained"
          onClick={() => handleSignIn(address, activeChain?.id)}
        >
          Sign-In with Admin Wallet
        </StyledButton>
      ) : (
        <StyledButton variant="contained" onClick={() => connect()}>
          Connect To Admin Wallet
        </StyledButton>
      )}
    </Box>
  );
};

export default AdminLoginButton;
