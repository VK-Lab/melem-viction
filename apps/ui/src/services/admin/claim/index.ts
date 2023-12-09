import {
  GetClaimsParams,
  GetClaimsResponse,
  UpdateClaimParams,
  UpdateClaimStatusResponse,
} from './types';
import request from '@/utils/request';

export const getClaims = (
  params?: GetClaimsParams
): Promise<GetClaimsResponse> => {
  return request.get('admin/claims', {
    params,
  });
};

export const updateClaimStatus = ({
  id,
  status,
}: UpdateClaimParams): Promise<UpdateClaimStatusResponse> => {
  return request.put(`admin/claims/${id}/status`, {
    status,
  });
};
