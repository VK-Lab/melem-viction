import { Container } from '@mui/material';

import AdminClaimTable from './AdminClaimTable';
import DashboardLayout from '@/layouts/DashboardLayout';

const AdminHome = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <AdminClaimTable />
      </Container>
    </DashboardLayout>
  );
};

export default AdminHome;
