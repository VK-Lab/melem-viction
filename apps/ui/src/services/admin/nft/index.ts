import {
  BatchCreateNftsParams,
  CreateNftParams,
  CreateNftResponse,
  GetNftsParams,
  GetNftsResponse,
  UpdateNftParams,
  UpdateNftResponse,
} from './types';
import request from '@/utils/request';

export const getNfts = (params?: GetNftsParams): Promise<GetNftsResponse> => {
  return request.get('/admin/nfts', {
    params,
  });
};

export const updateNft = ({
  id,
  ...rest
}: UpdateNftParams): Promise<UpdateNftResponse> => {
  return request.put(`/admin/nfts/${id}`, rest);
};

export const createNft = (
  params: CreateNftParams
): Promise<CreateNftResponse> => {
  return request.post('/admin/nfts', params);
};

export const batchCreateNfts = (params: BatchCreateNftsParams) => {
  return request.post('/admin/nfts/batchCreate', params);
};
