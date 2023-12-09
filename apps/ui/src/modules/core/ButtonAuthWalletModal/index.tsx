import { useState } from 'react';

import { AccountBalanceWallet } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Modal } from '@mui/material';

import AuthWallet from './AuthWallet';
import { StyledBox } from './styled';
import { useCheckPhoneVerfied } from '@/hooks/queries';

export const ButtonAuthWalletModal = () => {
  const {
    data: { isPhoneVerfied } = { isPhoneVerfied: false },
    isLoading,
    refetch,
  } = useCheckPhoneVerfied();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isPhoneVerfied) {
    return null;
  }

  const handleOnSuccess = async () => {
    await refetch();
    handleClose();
  };

  return (
    <Box>
      <LoadingButton
        onClick={() => handleOpen()}
        variant="outlined"
        endIcon={<AccountBalanceWallet />}
        loading={isLoading}
      >
        Sync Account
      </LoadingButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <AuthWallet onSuccess={() => handleOnSuccess()} />
        </StyledBox>
      </Modal>
    </Box>
  );
};
