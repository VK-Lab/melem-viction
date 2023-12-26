import Box from '@mui/material/Box';
import { customAlphabet } from 'nanoid/non-secure';
import { FormContainer, SelectElement } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledLoadingButton, StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { Config } from '@/config';
import { ContractNameEnum } from '@/enums/contractName.enum';
import { ContractType } from '@/enums/contractType.enum';
import { QueryKeys } from '@/enums/queryKeys.enum';
import {
  UseMutateCreateNftCollectionParams,
  useMutateCreateNftCollection,
} from '@/hooks/mutations';
import SelectBenefitsField from '@/modules/@core/SelectBenefitsField';

type NftFormProps = {
  onSuccess?: () => void;
};

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

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
    createNftCollectionParams: UseMutateCreateNftCollectionParams
  ) => {
    createNftCollectionMutation.mutate({
      ...createNftCollectionParams,
      uid: nanoid(),
    });
  };

  return (
    <FormContainer
      defaultValues={{
        name: '',
        contractType: ContractType.VRC725,
        chainId: `${Config.chainId}`,
        contractName: ContractNameEnum.PUBLIC,
      }}
      onSuccess={handleOnSubmitForm}
    >
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="symbol" label="Symbol" required />
      <StyledTextFieldElement name="description" label="Description" />
      <StyledTextFieldElement
        name="defaultImageUrl"
        label="Default NFT Image URL"
      />
      <Box mt="1rem">
        <SelectElement
          label="Contract Type"
          name="contractType"
          sx={{
            width: '100%',
          }}
          options={[
            {
              id: ContractType.VRC725,
              label: 'VRC725',
            },
          ]}
          required
        />
      </Box>
      <Box mt="1rem">
        <SelectElement
          label="Minting Policy"
          name="contractName"
          sx={{
            width: '100%',
          }}
          options={[
            {
              id: ContractNameEnum.INSTALLER,
              label: 'Installer',
            },
            {
              id: ContractNameEnum.PUBLIC,
              label: 'Public',
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
        <StyledLoadingButton
          loading={createNftCollectionMutation.isLoading}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          Create
        </StyledLoadingButton>
      </Box>
    </FormContainer>
  );
};

export default NftForm;
