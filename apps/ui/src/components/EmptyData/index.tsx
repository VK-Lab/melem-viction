import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/future/image'; // No wrapper

import ImgNoData from '@/assets/images/img--no-data.webp';

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
      <StyledText variant="h5">You do not have any NFTs yet</StyledText>
      <StyledImage src={ImgNoData} alt="Empty data" />
    </Box>
  );
};

export default EmptyData;
