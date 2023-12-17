import { useMemo } from 'react';

import { Box } from '@mui/material';
import dayjs from 'dayjs';
import _get from 'lodash/get';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { PopupState } from 'material-ui-popup-state/core';

import ClaimButtonMenu from './ClaimButtonMenu';
import ToastMessage from '@/components/Toast';
import { useMutateUpdateClaimStatus } from '@/hooks/mutations/useMutateUpdateClaimStatus';
import { useGetClaims } from '@/hooks/queries/useGetClaims';
import { Claim, ClaimStatusEnum } from '@/types/claim';

const AdminClaimTable = () => {
  const {
    data: { items = [] } = { claims: [], total: 0 },
    refetch,
    isLoading,
  } = useGetClaims();
  const updateClaimStatusMutation = useMutateUpdateClaimStatus();

  const handleOnChangeStatus = async (
    claimId: string,
    status: ClaimStatusEnum,
    popupState: PopupState
  ) => {
    popupState.close();
    await updateClaimStatusMutation.mutateAsync({
      id: claimId,
      status,
    });
    ToastMessage({
      type: 'success',
      message: 'Updated claim status successfully!',
    });
    await refetch();
  };

  const columns = useMemo<MRT_ColumnDef<Claim>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
      },

      {
        accessorKey: 'nftId',
        header: 'Nft',
        Cell: ({ row }) => (
          <Box component="div" sx={{ whiteSpace: 'normal' }}>
            {_get(row, 'original.nft.name', '-')}
          </Box>
        ),
      },
      {
        accessorKey: 'benefitId',
        header: 'Benefit',
        Cell: ({ row }) => (
          <Box component="div" sx={{ whiteSpace: 'normal' }}>
            {_get(row, 'original.benefit.name', '-')}
          </Box>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
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
        enableRowActions={true}
        positionActionsColumn={'last'}
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
        state={{
          isLoading: isLoading,
          columnPinning: {
            right: ['mrt-row-actions'],
            left: ['id'],
          },
        }}
        renderRowActions={({ row }) => {
          return (
            <Box>
              <ClaimButtonMenu
                popupId={`popup-state-claim-${row.original.id}`}
                defaultValue={row.original.status}
                onClick={(claimStatus, popupState) =>
                  handleOnChangeStatus(row.original.id, claimStatus, popupState)
                }
              />
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default AdminClaimTable;
