import { Box, Container } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { MuiTelInput } from 'mui-tel-input';

export const StyledWelcomePage = styled(Container)`
  display: flex;
`;

export const StyledWelcomeBlock = styled(Box)`
  width: 100%;
`;

export const StyledBox = styled(Box)`
  // flex: 0 0 auto;
  // position: relative;
`;

export const StyledButton = styled(Button)`
  padding: ${(props) => {
    return `${props.theme.spacing(2)} ${props.theme.spacing(5)}`;
  }};
  font-weight: 500;
  font-size: ${(props) => props.theme.typography.pxToRem(14)};
  border-radius: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(3)};
`;

export const StyledMuiTelInput = styled(MuiTelInput)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: 'white',
    borderColor: theme.palette.primary.light,
    width: '100%',
    '& + fieldset': {
      transitionDuration: '250ms',
      borderColor: theme.palette.primary.light,
    },
  },
  '& .MuiInputBase-root': {
    '&.Mui-focused .MuiInputBase-input + fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover .MuiInputBase-input + fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const StyledOTPInput = styled(MuiOtpInput)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&:hover .MuiInputBase-input + fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    color: 'white',
    '& + fieldset': {
      borderColor: theme.palette.primary.light,
    },
  },
}));
