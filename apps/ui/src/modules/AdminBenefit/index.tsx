import { Box, Container } from '@mui/material';

import AdminBenefitTable from './AdminBenefitTable';
import ButtonCreateModal from './ButtonCreateModal';
import DashboardLayout from '@/layouts/DashboardLayout';

const AdminBenefit = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box mt="2rem">
          <Box>
            <ButtonCreateModal />
          </Box>
          <AdminBenefitTable />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AdminBenefit;
