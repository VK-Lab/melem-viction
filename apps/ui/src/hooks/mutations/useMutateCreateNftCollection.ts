import { TomochainTestnet } from '@thirdweb-dev/chains';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import _get from 'lodash/get';
import { useMutation, UseMutationOptions } from 'react-query';

import { useI18nToast } from '../useToast';
import { MutationKeys } from '@/enums/mutationKeys.enum';
import { useEthersSigner } from '@/hooks/useEthers';
import { createNftCollection } from '@/services/admin/nft-collection';
import { CreateNftCollectionParams } from '@/services/admin/nft-collection/types';
import { generateMetadataBaseUrl } from '@/utils/metadata';

export type UseMutateCreateNftCollectionParams = {
  symbol: string;
} & CreateNftCollectionParams;

export const useMutateCreateNftCollection = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    UseMutateCreateNftCollectionParams,
    unknown
  >
) => {
  const { toastError } = useI18nToast();
  const signer = useEthersSigner();

  return useMutation({
    ...options,
    mutationFn: async (params) => {
      if (!signer) {
        throw new Error('signer is not defined');
      }
      console.log('params: ', params);

      const sdk = ThirdwebSDK.fromSigner(signer, TomochainTestnet, {
        clientId: 'a52cdd93846e9efa926f046e81140bce',
      });
      const deployedContractAddress =
        await sdk.deployer.deployPublishedContract(
          '0xCE16CDf11574629cAC4550D1f215e6e393eB4C5D',
          'NFTSimple',
          [
            params.name,
            params.symbol,
            `${generateMetadataBaseUrl(params.uid)}/`,
          ],
          '1.0.2'
        );

      return createNftCollection({
        ...params,
        tokenAddress: deployedContractAddress,
      });
    },
    onError: (err: Error) => {
      if (typeof err === 'object') {
        const isActionRejected = err.message.search(
          'user rejected transaction'
        );

        if (isActionRejected) {
          toastError('action_rejected');
          return;
        }
      }

      toastError(_get(err, 'code', 'gas_fee_balance'));
    },
    mutationKey: MutationKeys.CREATE_NFT_COLLECTION,
  });
};
