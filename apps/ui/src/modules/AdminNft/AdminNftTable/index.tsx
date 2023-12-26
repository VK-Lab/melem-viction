import { useMemo } from 'react';

import { Box } from '@mui/material';
import dayjs from 'dayjs';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import ButtonUpdateModal from './ButtonUpdateModal';
import { useGetAdminNfts } from '@/hooks/queries';
import { Nft } from '@/types/nft';

const AdminNftTable = () => {
  const { data: { items = [] } = { nfts: [], total: 0 }, isLoading } =
    useGetAdminNfts();

  // const handleCopy = (nft: Nft) => {
  //   const url = urlJoin(
  //     Config.apiBaseUrl,
  //     'nfts',
  //     nft.tokenAddress,
  //     nft.tokenId,
  //     'metadata'
  //   );

  //   copy(url);

  //   ToastMessage({
  //     type: 'success',
  //     message: 'Copied',
  //   });
  // };

  const columns = useMemo<MRT_ColumnDef<Nft>[]>(
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
        accessorKey: 'imageUrl',
        header: 'Image URL',
      },
      {
        accessorKey: 'tokenAddress',
        header: 'Token Address',
      },
      {
        accessorKey: 'tokenId',
        header: 'Token Id',
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
            tokenId: false,
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
              <ButtonUpdateModal nft={row.original} />
              {/* <Box minWidth="80px">
                <Button
                  variant="outlined"
                  onClick={() => handleCopy(row.original)}
                >
                  Metadata
                </Button>
              </Box> */}
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default AdminNftTable;
