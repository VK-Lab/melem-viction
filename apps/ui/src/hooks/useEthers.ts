import * as React from 'react';

import { providers } from 'ethers';
import { type HttpTransport } from 'viem';
import {
  type PublicClient,
  usePublicClient,
  WalletClient,
  useWalletClient,
} from 'wagmi';

import { vicMainnet } from '@/config/chains';

function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback')
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<HttpTransport>[]).map(
        ({ value }) => new providers.JsonRpcProvider(value?.url, network)
      )
    );
  return new providers.JsonRpcProvider(transport.url, network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return React.useMemo(
    () => publicClientToProvider(publicClient),
    [publicClient]
  );
}

function walletClientToSigner(walletClient: WalletClient) {
  const { account, transport } = walletClient;
  const network = {
    chainId: vicMainnet?.id,
    name: vicMainnet?.name,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner() {
  const { data: walletClient } = useWalletClient();

  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}
