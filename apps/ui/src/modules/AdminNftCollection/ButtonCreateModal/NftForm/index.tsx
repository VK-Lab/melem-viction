import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import { FormContainer, SelectElement } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { Config } from '@/config';
import { ContractType } from '@/enums/contractType.enum';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateNftCollection } from '@/hooks/mutations';
import SelectBenefitsField from '@/modules/core/SelectBenefitsField';
import { CreateNftCollectionParams } from '@/services/admin/nft-collection/types';

type NftFormProps = {
  onSuccess?: () => void;
};

const NftForm = ({ onSuccess }: NftFormProps) => {
  const queryClient = useQueryClient();
  const createNftCollectionMutation = useMutateCreateNftCollection({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Created nft collection successfully!',
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      onSuccess?.();
    },
  });

  const handleOnSubmitForm = async (
    createNftCollectionParams: CreateNftCollectionParams
  ) => {
    createNftCollectionMutation.mutate({
      ...createNftCollectionParams,
    });
  };

  return (
    <FormContainer
      defaultValues={{
        name: '',
        contractType: ContractType.ERC721,
        chainId: `${Config.chainId}`,
      }}
      onSuccess={handleOnSubmitForm}
    >
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />
      <Box mt="1rem">
        <SelectElement
          label="Contract Type"
          name="contractType"
          sx={{
            width: '100%',
          }}
          options={[
            {
              id: ContractType.ERC721,
              label: 'ERC721',
            },
            {
              id: ContractType.ERC1155,
              label: 'ERC1155',
            },
          ]}
          required
        />
      </Box>
      <Box mt="1rem">
        <SelectBenefitsField name="benefitIds" />
      </Box>
      <StyledTextFieldElement name="chainId" label="Chain Id" disabled />

      <Box mt="1rem">
        <LoadingButton
          loading={createNftCollectionMutation.isLoading}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          Create
        </LoadingButton>
      </Box>
    </FormContainer>
  );
};

export default NftForm;
