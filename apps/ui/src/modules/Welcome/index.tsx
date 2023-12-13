import { Typography } from '@mui/material';
import Image from 'next/future/image';

import {
  StyledImageOverlay,
  StyledBox,
  StyledWelcomeBlock,
  StyledWelcomePage,
  BoxGradientBG,
} from './styled';
import ConnectionButton from '@/modules/@core/ConnectionButton';
import imageWelcome from '~/public/img/background.jpeg';
import Logo from '~/public/img/logo.png';

const Welcome = () => {
  return (
    <StyledWelcomePage disableGutters maxWidth={false}>
      <div
        className="d2e--logo"
        style={{ position: 'fixed', left: 24, top: 24, zIndex: 1000 }}
      >
        <Image alt="Melem" src={Logo} style={{ height: 'auto', width: 80 }} />
      </div>
      <StyledBox className="left">
        <StyledImageOverlay />
        <Image
          alt="Mountains"
          src={imageWelcome}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            opacity: 0.1,
          }}
        />
      </StyledBox>
      <StyledBox className="right">
        <BoxGradientBG />
        <StyledWelcomeBlock elevation={24}>
          <Typography sx={{ fontSize: 32 }} variant="h2" gutterBottom>
            Welcome to Melem Dashboard
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
            Connect your wallet to claim the exclusive benefits from Melem
          </Typography>
          <ConnectionButton />
        </StyledWelcomeBlock>
      </StyledBox>
    </StyledWelcomePage>
  );
};

export default Welcome;
