import { useEffect, useState } from 'react';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import _get from 'lodash/get';
import { useMutation, UseMutationResult } from 'react-query';
import { SiweMessage } from 'siwe';
import {
  useAccount,
  useNetwork,
  useSignMessage,
  useSwitchNetwork,
} from 'wagmi';

import { useI18nToast } from './useToast';
import { getNonce, login } from '@/services/auth';
import { LoginParams, LoginResponse } from '@/services/auth/types';

export type Props = {
  onLoginSuccess?: (data: LoginResponse) => void;
  defaultChainId: number;
};

const useAuthWallet = ({
  loginMutation,
}: {
  loginMutation: UseMutationResult<unknown, unknown, LoginParams, unknown>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toastError } = useI18nToast();
  const { signMessageAsync } = useSignMessage();

  const signIn = async (walletAddress: string, chainId: number) => {
    setIsLoading(true);
    const { nonce } = await getNonce();

    const message = new SiweMessage({
      domain: window.location.host,
      address: walletAddress,
      statement: 'Sign in with Melem to the app.',
      uri: window.location.origin,
      version: '1',
      chainId: chainId,
      nonce: nonce,
    });

    try {
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      const result = await loginMutation.mutateAsync({
        message,
        signature,
      });

      return result;
    } catch (err) {
      toastError(_get(err, 'code', ''));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isSigning: isLoading,
  };
};

const useSignIn = ({ onLoginSuccess, defaultChainId }: Props) => {
  const { address, isConnected, connector } = useAccount();
  const { switchNetworkAsync } = useSwitchNetwork();

  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: 'login',
    onSuccess: (data) => {
      onLoginSuccess?.(data);
    },
  });

  const { chain: activeChain } = useNetwork();

  const { open } = useWeb3Modal();

  const { signIn, isSigning } = useAuthWallet({
    loginMutation,
  });

  const handleSignIn = async (walletAddress?: string, chainId?: number) => {
    if (!walletAddress || !chainId) {
      return;
    }
    if (chainId !== defaultChainId && switchNetworkAsync) {
      await switchNetworkAsync(defaultChainId);
    }
    await signIn(walletAddress, chainId);
  };

  useEffect(() => {
    if (!address) {
      return;
    }
    const callback = async () => {
      const chainId = await connector?.getChainId();
      await handleSignIn(address, chainId);
    };

    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return {
    connect: open,
    isConnected,
    address,
    handleSignIn,
    activeChain,
    isSigning,
  };
};

export default useSignIn;
