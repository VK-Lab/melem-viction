import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BoxProfile = styled(Box)`
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
  padding: 60px 0 0;
  color: white;
}`;

export const BoxProfileUnderbackground = styled(Box)(() => ({
  borderRadius: '24px 24px 0 0',
  position: 'absolute',
  height: '60%',
  width: '100%',
  backgroundColor: 'white',
  bottom: 0,
  left: 0,
}));

export const BoxProfileWrapper = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
  zIndex: 5,
  position: 'relative',
}));
