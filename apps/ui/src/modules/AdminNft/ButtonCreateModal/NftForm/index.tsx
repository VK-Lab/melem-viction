import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import {
  AutocompleteElement,
  FormContainer,
  SelectElement,
  useForm,
  useWatch,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';
import { useAccount } from 'wagmi';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateNft } from '@/hooks/mutations';
import { useGetBenefits, useGetAllNftCollections } from '@/hooks/queries';
import { CreateNftParams } from '@/services/admin/nft/types';
import { Benefit } from '@/types/benefit';
import { NftCollection } from '@/types/nft-collection';

type NftFormProps = {
  onSuccess: () => void;
};

const NftForm = ({ onSuccess }: NftFormProps) => {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const formContext = useForm<CreateNftParams>({
    defaultValues: {
      name: '',
      tokenAddress: '',
      walletAddress: address,
    },
  });

  const watchedTokenAddress = useWatch({
    control: formContext.control,
    name: 'tokenAddress',
  });

  const {
    data: { items = [] } = { items: [], total: 0 },
    isLoading: isLoadingBenefits,
  } = useGetBenefits();
  const createNftMutation = useMutateCreateNft(
    {
      contractAddress: watchedTokenAddress as `0x${string}`,
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QueryKeys.LIST_NFTS],
        });
        ToastMessage({
          type: 'success',
          message: 'Created NFT successfully!',
        });
        onSuccess?.();
      },
    }
  );

  const handleOnSubmitForm = async (createNftParams: CreateNftParams) => {
    createNftMutation.mutate(createNftParams);
  };

  const {
    data: { items: nftCollections } = { items: [], total: 0 },
    isLoading: isLoadingCollections,
  } = useGetAllNftCollections();

  return (
    <FormContainer formContext={formContext} onSuccess={handleOnSubmitForm}>
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />
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
      <StyledTextFieldElement name="imageUrl" label="Image Url" required />
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
      <StyledTextFieldElement name="walletAddress" label="To Wallet Address" />

      <Box mt="1rem">
        <LoadingButton
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          loading={
            isLoadingCollections ||
            isLoadingBenefits ||
            createNftMutation.isLoading
          }
        >
          Create
        </LoadingButton>
      </Box>
    </FormContainer>
  );
};

export default NftForm;
