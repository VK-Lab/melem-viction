import { BigNumber, ethers } from 'ethers';
import _get from 'lodash/get';
import { useMutation, UseMutationOptions } from 'react-query';
import { useContractWrite } from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';

import { NFT_COLLECTION_ABI } from '@/abis/nft-collection';
import { MutationKeys } from '@/enums/mutationKeys.enum';
import { createNft } from '@/services/admin/nft';
import { CreateNftParams, CreateNftResponse } from '@/services/admin/nft/types';

type Params = {
  contractAddress?: `0x${string}`;
};

export const useMutateCreateNft = (
  { contractAddress }: Params,
  options?: UseMutationOptions<
    CreateNftResponse,
    unknown,
    CreateNftParams,
    unknown
  >
) => {
  const { writeAsync } = useContractWrite({
    address: contractAddress,
    abi: NFT_COLLECTION_ABI,
    functionName: 'mint',
    maxFeePerGas: ethers.utils.parseUnits('1', 'gwei').toBigInt(),
  });

  return useMutation({
    ...options,
    mutationFn: async (params: CreateNftParams) => {
      if (!contractAddress) {
        throw new Error('contractAddress is not defined');
      }
      const walletAddress = _get(window.ethereum, 'selectedAddress', '');

      const { hash } = await writeAsync({
        args: [walletAddress],
      });
      const receipt = await waitForTransaction({ hash });
      const tokenIdHex = _get(receipt, 'logs[0].topics[3]');
      if (!tokenIdHex) {
        throw new Error('Can not get tokenId');
      }

      return createNft({
        ...params,
        tokenId: BigNumber.from(tokenIdHex).toString(),
      });
    },
    mutationKey: MutationKeys.CREATE_NFT,
  });
};
