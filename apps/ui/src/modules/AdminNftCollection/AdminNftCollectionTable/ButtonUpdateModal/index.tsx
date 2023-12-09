import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateUpdateNftCollection } from '@/hooks/mutations';
import { useI18nToast } from '@/hooks/useToast';
import SelectBenefitsField from '@/modules/core/SelectBenefitsField';
import { UpdateNftCollectionParams } from '@/services/admin/nft-collection/types';
import { NftCollection } from '@/types/nft-collection';

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
  nftCollection: NftCollection;
};

const ButtonUpdateModal = ({ nftCollection }: ButtonUpdateModalProps) => {
  const queryClient = useQueryClient();
  const { toastSuccess } = useI18nToast();
  const [open, setOpen] = useState(false);
  const updateNftMutation = useMutateUpdateNftCollection({
    onSuccess: async () => {
      toastSuccess('update_nft_collection_success');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (
    updateNftCollectionParams: UpdateNftCollectionParams
  ) => {
    updateNftMutation.mutate({
      ...updateNftCollectionParams,
      id: nftCollection.id,
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
            Update Nft
          </Typography>
          <Box mt={2}>
            <FormContainer
              defaultValues={{
                name: nftCollection.name,
                description: nftCollection.description,
                benefitIds: nftCollection.benefitIds,
              }}
              onSuccess={handleOnSubmitForm}
            >
              <StyledTextFieldElement name="name" label="Name" required />
              <StyledTextFieldElement name="description" label="Description" />
              <Box mt="1rem">
                <SelectBenefitsField name="benefitIds" />
              </Box>
              <Box mt="1rem">
                <Button type={'submit'} color={'primary'} variant={'contained'}>
                  Update
                </Button>
              </Box>
            </FormContainer>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonUpdateModal;
