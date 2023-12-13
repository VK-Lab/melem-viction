import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Paper)`
  width: 440px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${(props) => props.theme.spacing(6)};
  padding: 24px;
  padding: ${(props) => props.theme.spacing(6)};
  color: ${({ theme }) => {
    const textColor = theme.palette.getContrastText(theme.palette.primary.dark);
    return textColor ?? theme.palette.primary.contrastText;
  }};
  background-color: ${({ theme }) => theme.palette.primary.dark};
`;
