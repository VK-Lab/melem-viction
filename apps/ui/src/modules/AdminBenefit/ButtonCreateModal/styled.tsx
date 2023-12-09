import { styled } from '@mui/material/styles';
import { TextFieldElement } from 'react-hook-form-mui';

export const StyledTextFieldElement = styled(TextFieldElement)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
