import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {
  FormContainer,
  SelectElement,
  useFormContext,
  useWatch,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateBenefit } from '@/hooks/mutations';
import { Benefit } from '@/types/benefit';

export enum BeneiftSourceEnum {
  WOOCOMMERCE = 'woocommerce',
  MANUAL = 'manual',
}

const DiscountsField = () => {
  const { control } = useFormContext();
  const source = useWatch({
    control,
    name: 'source',
  });

  if (source !== BeneiftSourceEnum.WOOCOMMERCE) {
    return null;
  }

  return (
    <StyledTextFieldElement
      type="number"
      name="amount"
      label="Discounts (%)"
      required
    />
  );
};

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

type BenefitFormProps = {
  onSuccess: (data: Benefit) => void;
};

const BenefitForm = ({ onSuccess }: BenefitFormProps) => {
  return (
    <FormContainer defaultValues={{ name: '' }} onSuccess={onSuccess}>
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />
      <Box mt="1rem">
        <SelectElement
          label="Source"
          name="source"
          sx={{
            width: '100%',
          }}
          options={[
            {
              id: BeneiftSourceEnum.MANUAL,
              label: 'Manual',
            },
            {
              id: BeneiftSourceEnum.WOOCOMMERCE,
              label: 'WooCommerce',
            },
          ]}
          required
        />
        <DiscountsField />
      </Box>
      <Box mt="1rem">
        <Button type={'submit'} color={'primary'} variant={'contained'}>
          Create
        </Button>
      </Box>
    </FormContainer>
  );
};

const ButtonCreateModal = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const createBenefitMutation = useMutateCreateBenefit({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Created benefit successfully!',
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.BENEFITS] });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (benefit: Benefit) => {
    createBenefitMutation.mutate(benefit);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Create Benefit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Benefit
          </Typography>
          <Box mt={2}>
            <BenefitForm onSuccess={handleOnSubmitForm} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonCreateModal;
