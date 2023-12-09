import { Drawer, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAuthLayout = styled(Container)`
  display: flex;
  min-height: 100%;
`;

// eslint-disable-next-line
const getDrawerWidth = (props: any) => {
  if (!props.sx) {
    return `360px`;
  }

  return `${props.sx.width}px`;
};

const StyledDrawer = styled(Drawer)`
  width: ${(props) => getDrawerWidth(props)};
  flex-shrink: 0;
  box-shadow: ${(p) => p.theme.shadows[12]};
  height: 100vh;

  .MuiDrawer-paper {
    padding: ${({ theme }) => `0 ${theme.spacing(2)}`};
    border-right-color: transparent;
    width: ${(props) => getDrawerWidth(props)};
    box-sizing: border-box;
  },
`;

const StyledDashboardBody = styled(Box)`
  width: auto;
  flex: 1 1 0;
`;

const StyledAdminHeader = styled(Box)`
  /* background-color: ${(p) => p.theme.palette.background.paper}; */
  position: sticky;
  top: 0;
  z-index: 20;
`;

const StyledDashboardBodyContent = styled(Box)`
  padding: ${(props) => props.theme.spacing(2)};
  flex-grow: 1;
  z-index: 10;
`;

const StyledDashboardSection = styled(Box)`
  border-radius: 12px;
  background-color: ${(p) => p.theme.palette.background.paper};
  padding: ${(props) => props.theme.spacing(2)};
`;

export {
  StyledAdminHeader,
  StyledDrawer,
  StyledDashboardBody,
  StyledDashboardBodyContent,
  StyledAuthLayout,
  StyledDashboardSection,
};
