import { BigNumber, ethers } from 'ethers';
import _get from 'lodash/get';
import { useMutation, UseMutationOptions } from 'react-query';
import { useContractWrite } from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';

import { NFT_COLLECTION_ABI } from '@/abis/nft-collection';
import { MutationKeys } from '@/enums/mutationKeys.enum';
import { CreateNftParams, CreateNftResponse } from '@/services/admin/nft/types';
import { createNft } from '@/services/nft';

type Params = {
  contractAddress?: `0x${string}`;
};

export const useMutateCreatePublicNft = (
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

      const { hash } = await writeAsync({
        args: [params.walletAddress],
      });
      const receipt = await waitForTransaction({ hash });
      const tokenIdHex = _get(receipt, 'logs[0].topics[3]');
      if (!tokenIdHex) {
        throw new Error('Can not get tokenId');
      }

      const nftCreated = await createNft({
        ...params,
        name: `${params.name} #${BigNumber.from(tokenIdHex).toString()}`,
        tokenId: BigNumber.from(tokenIdHex).toString(),
      });

      return {
        id: nftCreated.id,
        deployHash: hash,
      };
    },
    mutationKey: MutationKeys.CREATE_NFT,
  });
};
