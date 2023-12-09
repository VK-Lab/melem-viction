import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledNFTTab = styled(Box)`
  position: sticky;
  top: 64px;
  z-index: 10;
  background-color: 'white';
  background-color: ${(p) => p.theme.palette.background.paper};
`;

const StyledNFTTabContent = styled(Box)`
  background-color: ${(p) => p.theme.palette.background.paper};
  padding-top: ${(p) => p.theme.spacing(3)};
`;

export { StyledNFTTabContent, StyledNFTTab };
