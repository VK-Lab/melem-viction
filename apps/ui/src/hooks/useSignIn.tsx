import { useState } from 'react';

import _get from 'lodash/get';
import { useMutation, UseMutationResult } from 'react-query';
import { SiweMessage } from 'siwe';
import {
  useAccount,
  useConnect,
  useNetwork,
  useSignMessage,
  useSwitchNetwork,
} from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import { useI18nToast } from './useToast';
import { vicMainnet } from '@/config/chains';
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
  const { toastError } = useI18nToast();
  const { address, isConnected } = useAccount();
  const { switchNetworkAsync } = useSwitchNetwork();

  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: 'login',
    onSuccess: (data) => {
      onLoginSuccess?.(data);
    },
  });

  const { chain: activeChain } = useNetwork();
  const { connect } = useConnect({
    chainId: vicMainnet.id,
    connector: new MetaMaskConnector(),
    onSuccess: async (data) => {
      const { account, chain } = data;
      await handleSignIn(account, chain?.id);
    },
    onError: async (err: Error) => {
      toastError(err.name);
    },
  });
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

  return {
    connect,
    isConnected,
    address,
    handleSignIn,
    activeChain,
    isSigning,
  };
};

export default useSignIn;
