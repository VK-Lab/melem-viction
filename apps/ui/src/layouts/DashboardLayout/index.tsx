import { Toolbar } from '@mui/material';
import Image from 'next/future/image'; // No wrapper

import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import {
  StyledDrawer,
  StyledDashboardBody,
  StyledAuthLayout,
  StyledDashboardBodyContent,
} from './styled';
import Logo from '~/public/img/logo.png';

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
        <div
          className="d2e--logo"
          style={{ height: 64, textAlign: 'center', padding: '10px 0' }}
        >
          <Image alt="logo" src={Logo} style={{ width: 64, height: 'auto' }} />
        </div>
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
