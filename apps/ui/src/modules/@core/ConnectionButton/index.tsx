import React from 'react';

import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { StyledButton } from './styled';
import { Config } from '@/config';
import { CookieKeys } from '@/enums/cookieKeys.enum';
import { PrivatePaths } from '@/enums/paths.enum';
import useSignIn from '@/hooks/useSignIn';
import { LoginResponse } from '@/services/auth/types';

const ConnectorButtonMenu = () => {
  const router = useRouter();

  const onLoginSuccess = (data: LoginResponse) => {
    Cookies.set(CookieKeys.TOKEN, data.accessToken);
    router.push(PrivatePaths.USER_COLLECTION);
  };
  const {
    handleSignIn,
    connect,
    address,
    isConnected,
    activeChain,
    isSigning,
  } = useSignIn({
    onLoginSuccess,
    defaultChainId: Config.chainId,
  });

  return (
    <Box>
      {isConnected ? (
        <StyledButton
          fullWidth
          variant="contained"
          onClick={() => handleSignIn(address, activeChain?.id)}
          loading={isSigning}
        >
          Sign-In with Your Wallet
        </StyledButton>
      ) : (
        <StyledButton
          fullWidth
          variant="contained"
          onClick={() => connect()}
          loading={isSigning}
        >
          Connect To Your Wallet
        </StyledButton>
      )}
    </Box>
  );
};

export default ConnectorButtonMenu;
