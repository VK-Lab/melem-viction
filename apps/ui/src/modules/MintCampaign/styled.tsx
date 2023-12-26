import { LoadingButton } from '@mui/lab';
import { Paper, Box, Container } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

export const StyledWelcomePage = styled(Container)`
  display: flex;
  height: 100vh;
`;

export const StyledWelcomeBlock = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
  border-radius: ${(props) => props.theme.spacing(4)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-125%, -50%);
  min-width: 460px;
  padding: ${(props) => props.theme.spacing(6)};
  color: ${({ theme }) => {
    const textColor = theme.palette.getContrastText(theme.palette.primary.dark);
    return textColor ?? theme.palette.primary.contrastText;
  }};
`;

export const StyledBox = styled(Box)`
  flex: 0 0 auto;
  position: relative;

  &.left {
    width: 70%;
    height: 100%;
  }

  &.right {
    width: 30%;
  }
`;

export const StyledImageOverlay = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const BoxGradientBG = styled('div')`
  @keyframes bgAnimate {
    0% {
      background-position: 76% 0%;
    }
    50% {
      background-position:25% 100%;
    }
    100% {
      background-position:76% 0%
    }
  }
  background: ${() => {
    return `linear-gradient(90deg, #48176C 0%, #070326 100%);`;
  }}
  background-size: 400% 400%;
  height: 100%;

  -webkit-animation: bgAnimate 12s ease infinite;
  -moz-animation: bgAnimate 12s ease infinite;
  animation: bgAnimate 12s ease infinite;
  position: absolute;
  width: 100%;
}`;

export const StyledButton = styled(LoadingButton)`
  padding: ${(props) => {
    return `${props.theme.spacing(1)} ${props.theme.spacing(5)}`;
  }};
  font-weight: 500;
  font-size: ${(props) => props.theme.typography.pxToRem(14)};
  margin-top: ${(props) => props.theme.spacing(3)};
`;

export const StyledMenuItem = styled(MenuItem)`
  width: 260px;

  .icon {
    width: 30px;
    margin-right: ${(props) => props.theme.spacing(1.5)};
    min-width: 30px;

    .image--provider {
      max-width: 100%;
      height: auto;

      &.casperdash {
        transform: scale(1.35);
      }

      &.trust {
        transform: scale(0.95);
      }
    }
  }

  .wallet-name {
    padding-top: ${(props) => props.theme.spacing(1.5)};
    padding-bottom: ${(props) => props.theme.spacing(1.5)};
    font-size: ${(props) => props.theme.typography.pxToRem(14)};
  }
`;
