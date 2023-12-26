import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { castArray } from 'lodash';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import { StyledButton } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateUpdateCampaign } from '@/hooks/mutations';
import SelectNftCollectionsField from '@/modules/@core/SelectNftCollectionsField';
import { UpdateCampaignParams } from '@/services/admin/campaign/types';
import { Campaign } from '@/types/campaign';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type ButtonUpdateModalProps = {
  campaign: Campaign;
};

const ButtonUpdateModal = ({ campaign }: ButtonUpdateModalProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const updateCampaignMutation = useMutateUpdateCampaign({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Updated campaign successfully!',
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.CAMPAIGNS] });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (updateCampaignParams: UpdateCampaignParams) => {
    const { nftCollectionId, ...restParams } = updateCampaignParams;
    updateCampaignMutation.mutate({
      ...restParams,
      id: campaign.id,
      nftCollectionIds: castArray(nftCollectionId),
    });
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Campaign
          </Typography>
          <Box mt={2}>
            <FormContainer
              defaultValues={{
                name: campaign.name,
                description: campaign.description,
                nftCollectionId: campaign?.nftCollectionIds[0],
              }}
              onSuccess={handleOnSubmitForm}
            >
              <StyledTextFieldElement name="name" label="Name" required />
              <StyledTextFieldElement name="description" label="Description" />
              <Box mt="1rem">
                <SelectNftCollectionsField
                  name="nftCollectionId"
                  campaignId={campaign.id}
                />
              </Box>
              <Box mt="1rem">
                <StyledButton
                  loading={updateCampaignMutation.isLoading}
                  type={'submit'}
                  color={'primary'}
                  variant={'contained'}
                >
                  Update
                </StyledButton>
              </Box>
            </FormContainer>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonUpdateModal;
