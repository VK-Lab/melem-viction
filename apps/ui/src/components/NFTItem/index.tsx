import { Typography, Box } from '@mui/material';

import { StyledNFTItem } from './styled';
import { CardImage } from '@/components/CardImage';

export type NFTItemProps = {
  image?: string;
  contractType?: string;
  name?: string;
  description?: string;
};

const NFTItem = ({ image = '', name, description }: NFTItemProps) => {
  return (
    <StyledNFTItem>
      <Box className="nft-grid--image">
        <CardImage src={image} autoPlay={false} controls />
      </Box>
      <Box className="nft-grid--body">
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle2" gutterBottom>
          {description}
        </Typography>
      </Box>
    </StyledNFTItem>
  );
};

export default NFTItem;
