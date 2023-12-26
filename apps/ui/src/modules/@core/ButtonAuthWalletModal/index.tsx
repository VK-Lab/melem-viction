import { useState } from 'react';

import { Box, Modal } from '@mui/material';

import AuthWallet from './AuthWallet';
import { StyledBox } from './styled';

export const ButtonAuthWalletModal = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOnSuccess = async () => {
    handleClose();
  };

  return (
    <Box>
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
