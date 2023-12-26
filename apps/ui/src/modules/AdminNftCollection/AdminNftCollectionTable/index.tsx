import { useMemo } from 'react';

import { Box } from '@mui/material';
import dayjs from 'dayjs';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import ButtonUpdateModal from './ButtonUpdateModal';
import { useGetAllNftCollections } from '@/hooks/queries/useGetAllNftCollections';
import { NftCollection } from '@/types/nft-collection';

const AdminNftCollectionTable = () => {
  const { data: { items = [] } = { items: [] }, isLoading } =
    useGetAllNftCollections();

  const columns = useMemo<MRT_ColumnDef<NftCollection>[]>(
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
      {
        accessorKey: 'tokenAddress',
        header: 'Token Address',
      },
      {
        accessorKey: 'chainId',
        header: 'Chain Id',
      },
      {
        accessorKey: 'contractType',
        header: 'Contract Type',
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        Cell: ({ row }) => (
          <Box component="div" sx={{ whiteSpace: 'normal' }}>
            {dayjs(row.original.createdAt).format('YYYY-MM-DD h:mm:ss A')}
          </Box>
        ),
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
        muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
        initialState={{
          columnVisibility: {
            id: false,
            tokenAddress: false,
            chainId: false,
            contractType: false,
          },
        }}
        state={{
          isLoading: isLoading,
          columnPinning: {
            right: ['mrt-row-actions'],
            left: ['id'],
          },
        }}
        enableRowActions={true}
        renderRowActions={({ row }) => {
          return (
            <Box display="flex" gap="10px">
              <ButtonUpdateModal nftCollection={row.original} />
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default AdminNftCollectionTable;
