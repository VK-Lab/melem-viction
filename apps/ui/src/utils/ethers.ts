import { ethers, providers } from 'ethers';

import { NFT_COLLECTION_ABI } from '@/abis/nft-collection';

export const getEthersProvider = () => {
  if (!window.ethereum) {
    return;
  }
  const provider = new ethers.providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  return provider;
};

export const getContract = (
  tokenAddress: string,
  abi: Record<string, unknown>[] = NFT_COLLECTION_ABI
) => {
  const provider = getEthersProvider();
  if (!provider) {
    return;
  }

  const signer = provider.getSigner();

  const contract = new ethers.Contract(tokenAddress, abi, signer);

  return contract;
};

export const mintNftTo = async (
  tokenAddress: string,
  { walletAddress }: { walletAddress: string }
) => {
  const contract = getContract(tokenAddress);

  if (!contract) {
    return;
  }

  return contract.mint(walletAddress);
};

export const batchMintNfts = (
  to: string,
  tokenAddress: string,
  uris: string[]
) => {
  const contract = getContract(tokenAddress);
  if (!contract) {
    return;
  }

  const encodeds = uris.map((uri) =>
    contract.interface.encodeFunctionData('mintTo', [to, uri])
  );

  return contract.multicall(encodeds);
};
