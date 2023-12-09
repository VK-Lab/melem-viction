import { Box, Container } from '@mui/material';

import AdminNftCollectionTable from './AdminNftCollectionTable';
import ButtonCreateModal from './ButtonCreateModal';
import DashboardLayout from '@/layouts/DashboardLayout';

const AdminNftCollection = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box>
          <ButtonCreateModal />
        </Box>
        <Box mt="2rem">
          <AdminNftCollectionTable />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AdminNftCollection;
