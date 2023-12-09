import { Box, BoxProps, Accordion, AccordionProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ICustomTheme } from '@/theme/index';
const StyledNFTImageBox = styled(Box)`
  position: relative;
  border-radius: 12px;
  margin-bottom: 24px;
  height: 400px;
  width: 100%;

  img {
    border-radius: 12px 12px 0 0;
    object-position: center center;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

interface AccordionCustomProps extends AccordionProps {
  theme?: ICustomTheme;
}

interface CustomBoxProps extends BoxProps {
  theme?: ICustomTheme;
}

const StyledAccordionDetails = styled((props: AccordionCustomProps) => (
  <Accordion defaultExpanded elevation={0} {...props} />
))(({ theme }) => ({
  boxShadow: theme.customShadows[1],
  '&:before': {
    display: 'none',
  },
}));

const StyledBoxRight = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledBoxBenefitsWrapper = styled((props: CustomBoxProps) => (
  <Box {...props} />
))(({ theme }) => ({
  boxShadow: theme.customShadows[1],
  paddingTop: 16,
  paddingBottom: 16,
}));

export {
  StyledBoxBenefitsWrapper,
  StyledBoxRight,
  StyledAccordionDetails,
  StyledNFTImageBox,
};
