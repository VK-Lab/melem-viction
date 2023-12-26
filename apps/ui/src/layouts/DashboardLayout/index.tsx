import { Toolbar } from '@mui/material';

import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import {
  StyledDrawer,
  StyledDashboardBody,
  StyledAuthLayout,
  StyledDashboardBodyContent,
} from './styled';
import GLogo from '@/components/GLogo';

const DRAWER_WIDTH = 300;

export type Props = {
  children?: React.ReactNode;
  elementTopbar?: React.ReactNode;
};

const DashboardLayout = ({ children, elementTopbar }: Props) => {
  return (
    <StyledAuthLayout disableGutters maxWidth={false}>
      <StyledDrawer
        sx={{ width: DRAWER_WIDTH }}
        variant="permanent"
        anchor="left"
      >
        <GLogo />
        <AdminSidebar maxWidth={DRAWER_WIDTH} />
      </StyledDrawer>
      <StyledDashboardBody>
        <AdminTopbar drawerWidth={DRAWER_WIDTH}>{elementTopbar}</AdminTopbar>
        <StyledDashboardBodyContent>
          <Toolbar />
          {children}
        </StyledDashboardBodyContent>
      </StyledDashboardBody>
    </StyledAuthLayout>
  );
};

export default DashboardLayout;
