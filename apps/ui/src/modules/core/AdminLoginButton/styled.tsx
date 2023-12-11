import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)`
  padding: ${(props) => {
    return `${props.theme.spacing(2)} ${props.theme.spacing(5)}`;
  }};
  font-weight: 500;
  font-size: ${(props) => props.theme.typography.pxToRem(14)};
  border-radius: ${(props) => props.theme.spacing(4)};
  margin-top: ${(props) => props.theme.spacing(3)};
  width: 100%;
`;
