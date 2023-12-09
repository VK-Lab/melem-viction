import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateCampaign } from '@/hooks/mutations';
import SelectNftCollectionsField from '@/modules/core/SelectNftCollectionsField';
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
    createCampaignMutation.mutate(createCampaignParams);
  };

  return (
    <FormContainer
      defaultValues={{
        name: '',
        description: '',
      }}
      onSuccess={handleOnSubmitForm}
    >
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />
      <Box mt="1rem">
        <SelectNftCollectionsField name="nftCollectionIds" />
      </Box>
      <Box mt="1rem">
        <LoadingButton
          loading={createCampaignMutation.isLoading}
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
