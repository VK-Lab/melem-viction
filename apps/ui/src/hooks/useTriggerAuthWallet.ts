import { useEffect } from 'react';

import { BigNumber } from 'ethers';
import { useRouter } from 'next/router';

import { Config } from '@/config';
import { PublicPaths } from '@/enums/paths.enum';
import { useMutateLogout } from '@/hooks/mutations';

export const useTriggerAuthWallet = () => {
  const logoutMutation = useMutateLogout();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!window.ethereum || !window.ethereum?.on) {
      return;
    }
    const publicPaths: string[] = Object.values(PublicPaths);
    if (publicPaths.includes(router.pathname as string)) {
      return;
    }

    const onLogout = () => {
      logoutMutation.mutate();
    };
    const onChangeChain = (hexChainId: string) => {
      const chainId = BigNumber.from(hexChainId).toNumber();
      if (chainId !== Config.chainId) {
        logoutMutation.mutate();
      }
    };

    window.ethereum.on('accountsChanged', onLogout);
    window.ethereum.on('chainChanged', onChangeChain);
    window.ethereum.on('disconnect', onLogout);

    return () => {
      if (!window.ethereum?.removeListener) {
        return;
      }
      window.ethereum?.removeListener('accountsChanged', onLogout);
      window.ethereum?.removeListener('chainChanged', onChangeChain);
      window.ethereum?.removeListener('disconnect', onLogout);
    };
  }, [logoutMutation, router.isReady, router.pathname]);
};
