import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import _get from 'lodash/get';
import {
  AutocompleteElement,
  FormContainer,
  SelectElement,
  useForm,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';
import * as yup from 'yup';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateBatchCreateNfts } from '@/hooks/mutations';
import { useGetBenefits, useGetAllNftCollections } from '@/hooks/queries';
import { useI18nToast } from '@/hooks/useToast';
import {
  BatchCreateNftsParams,
  CreateNftParams,
} from '@/services/admin/nft/types';
import { Benefit } from '@/types/benefit';
import { NftCollection } from '@/types/nft-collection';
import { batchMintNfts } from '@/utils/ethers';
import { generateMetadataUrl } from '@/utils/metadata';

const validationSchema = yup.object({
  total: yup
    .number()
    .typeError('Total must be number')
    .required('This field is required')
    .min(1),
  name: yup.string().required('This field is required'),
  tokenAddress: yup.string().required('This field is required'),
  tokenId: yup.string().required('This field is required'),
  imageUrl: yup.string().required('This field is required'),
});

type Props = {
  onSuccess: () => void;
};

const BulkNftForm = ({ onSuccess }: Props) => {
  const { toastError } = useI18nToast();
  const queryClient = useQueryClient();
  const {
    data: { items = [] } = { items: [], total: 0 },
    isLoading: isLoadingBenefits,
  } = useGetBenefits();
  const batchCreateNftsMutation = useMutateBatchCreateNfts({
    onMutate: async ({ nfts }: BatchCreateNftsParams) => {
      try {
        const tokenAddress = _get(nfts, '[0].tokenAddress', '');
        const walletAddress = _get(window.ethereum, 'selectedAddress', '');

        const uris = nfts.map((nft: CreateNftParams) => {
          return generateMetadataUrl(nft.tokenAddress, nft.tokenId);
        });

        await batchMintNfts(walletAddress, tokenAddress, uris);
      } catch (err) {
        toastError(_get(err, 'code', ''));

        throw err;
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST_NFTS] });
      ToastMessage({
        type: 'success',
        message: 'Bulk created NFT successfully!',
      });
      onSuccess?.();
    },
  });

  const formContext = useForm<CreateNftParams & { total: string }>({
    defaultValues: {
      total: '1',
      name: '',
      description: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmitForm = async ({
    total,
    ...createNftParams
  }: CreateNftParams & { total: string }) => {
    const nfts = [...Array.from(Array(Number(total)).keys())].map(
      (value: number) => {
        const currentTokenId = (
          Number(createNftParams.tokenId) + value
        ).toString();
        return {
          ...createNftParams,
          name: createNftParams.name.replaceAll('[id]', currentTokenId),
          imageUrl: createNftParams.imageUrl.replaceAll('[id]', currentTokenId),
          description: createNftParams.description?.replaceAll(
            '[id]',
            currentTokenId
          ),
          tokenId: currentTokenId.toString(),
        };
      }
    );

    batchCreateNftsMutation.mutate({
      nfts,
    });
  };

  const {
    data: { items: nftCollections } = { items: [], total: 0 },
    isLoading: isLoadingCollections,
  } = useGetAllNftCollections();

  return (
    <FormContainer formContext={formContext} onSuccess={handleOnSubmitForm}>
      <Box>
        <Typography variant="subtitle2">
          <b>[id]</b> dynamic id number on name, description, image URL.
        </Typography>
      </Box>
      <StyledTextFieldElement
        name="total"
        label="Total"
        required
        type="number"
      />
      <StyledTextFieldElement
        name="name"
        label="Name"
        placeholder={'Card #[id]'}
        required
      />
      <StyledTextFieldElement
        name="description"
        placeholder="Description [id]"
        label="Description"
      />
      <StyledTextFieldElement
        name="imageUrl"
        label="Image Url"
        placeholder="https://example.storage/card_[id].png"
        required
      />
      <Box mt="1rem">
        <SelectElement
          label="NFT Collection"
          name="tokenAddress"
          sx={{
            width: '100%',
          }}
          options={nftCollections.map((nftCollection: NftCollection) => {
            return {
              id: nftCollection.tokenAddress,
              label: nftCollection.name,
            };
          })}
          required
        />
      </Box>

      <Box mt="1rem">
        <AutocompleteElement
          label="Benefits"
          matchId
          multiple
          name="benefits"
          options={items.map((item: Benefit) => {
            return {
              id: item.id,
              label: item.name,
            };
          })}
        />
      </Box>
      <Box mt="1rem">
        <LoadingButton
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          loading={
            isLoadingCollections ||
            isLoadingBenefits ||
            batchCreateNftsMutation.isLoading
          }
        >
          Create
        </LoadingButton>
      </Box>
    </FormContainer>
  );
};

export default BulkNftForm;
