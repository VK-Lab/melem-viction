import { useMemo } from 'react';

import { Box } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import { useGetBenefits } from '@/hooks/queries';
import { Benefit } from '@/types/benefit';

const AdminBenefitTable = () => {
  const { data: { items = [] } = { items: [], total: 0 }, isLoading } =
    useGetBenefits();

  const columns = useMemo<MRT_ColumnDef<Benefit>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
    ],
    []
  );

  return (
    <Box mt="2rem">
      <MaterialReactTable
        columns={columns}
        data={items}
        positionActionsColumn={'last'}
        state={{ isLoading: isLoading }}
        muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
      />
    </Box>
  );
};

export default AdminBenefitTable;
