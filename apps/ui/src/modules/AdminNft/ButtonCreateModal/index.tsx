import { useState } from 'react';

import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import NftForm from './NftForm';

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

const ButtonCreateModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnSuccess = () => {
    handleClose();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Create NFT
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            position="absolute"
            right="3%"
            top="8px"
            sx={{ cursor: 'pointer' }}
          >
            <IconButton onClick={handleClose}>
              <Close sx={{ color: grey[500] }} />
            </IconButton>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create NFT
          </Typography>
          <Box mt={2}>
            <NftForm onSuccess={handleOnSuccess} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonCreateModal;
