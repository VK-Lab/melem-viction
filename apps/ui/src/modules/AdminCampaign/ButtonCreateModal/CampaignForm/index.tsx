import Box from '@mui/material/Box';
import { castArray } from 'lodash';
import { FormContainer, SelectElement } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledButton, StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateCampaign } from '@/hooks/mutations';
import SelectNftCollectionsField from '@/modules/@core/SelectNftCollectionsField';
import { CreateCampaignParams } from '@/services/admin/campaign/types';

type Props = {
  onSuccess?: () => void;
};

const NftForm = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();

  const createCampaignMutation = useMutateCreateCampaign({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Created campaign successfully!',
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.CAMPAIGNS],
      });
      onSuccess?.();
    },
  });

  const handleOnSubmitForm = (createCampaignParams: CreateCampaignParams) => {
    const { nftCollectionId, ...rest } = createCampaignParams;

    createCampaignMutation.mutate({
      ...rest,
      nftCollectionIds: castArray(nftCollectionId),
    });
  };

  return (
    <FormContainer
      defaultValues={{
        name: '',
        description: '',
        type: 'free_mint',
        nftCollectionIds: [],
      }}
      onSuccess={handleOnSubmitForm}
    >
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />
      <Box mt="1rem">
        <SelectElement
          sx={{ width: '100%' }}
          options={[
            {
              label: 'Free Mint',
              id: 'free_mint',
            },
          ]}
          name={'type'}
          required
        />
      </Box>
      <Box mt="1rem">
        <SelectNftCollectionsField name="nftCollectionId" />
      </Box>
      <Box mt="1rem">
        <StyledButton
          loading={createCampaignMutation.isLoading}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          Create
        </StyledButton>
      </Box>
    </FormContainer>
  );
};

export default NftForm;
