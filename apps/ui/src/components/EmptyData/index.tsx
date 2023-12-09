import { Link, Button, ButtonProps, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/future/image'; // No wrapper

import ImgNoData from '@/assets/images/img--no-data.webp';

interface ButtonLinkProps extends ButtonProps {
  component: React.ComponentType;
  target: string;
  rel: string;
}

const StyledImage = styled(Image)(() => ({
  maxWidth: 720,
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: 'auto',
  filter: 'grayscale(100%)',
  position: 'relative',
  zIndex: 5,
  top: -30,
}));

const StyledButtonLink = styled((props: ButtonLinkProps) => (
  <Button {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: '7px 8px 18px 0px rgb(0 0 0 / 10%)',
  fontSize: theme.typography.pxToRem(16),
  fontWeight: 600,
  padding: '12px 24px',
  marginLeft: theme.spacing(1),
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
  position: 'relative',
  zIndex: 10,
  color: '#878787',
}));

// Source: https://www.freepik.com/free-vector/nft-concept-illustration_25026371.htm#page=2&query=nft&position=14&from_view=search&track=sph#position=14&page=2&query=nft
const EmptyData = () => {
  return (
    <Box sx={{ maxWidth: '100%', textAlign: 'center' }}>
      <StyledText variant="h5">
        You do not have any D2E NFTs yet
        <StyledButtonLink
          variant="contained"
          component={Link}
          target="_blank"
          href="https://testnets.opensea.io/collection/d2e-cards-v2"
          rel="noopener noreferrer"
        >
          Buy your first NFT
        </StyledButtonLink>
      </StyledText>
      <StyledImage src={ImgNoData} alt="Empty data" />
    </Box>
  );
};

export default EmptyData;
