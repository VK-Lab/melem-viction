import {
  CreateNftCollectionParams,
  CreateNftCollectionResponse,
  GetNftCollectionsParams,
  GetNftCollectionsResponse,
  UpdateNftCollectionParams,
  UpdateNftCollectionResponse,
} from './types';
import request from '@/utils/request';

export const getNftCollections = (
  params?: GetNftCollectionsParams
): Promise<GetNftCollectionsResponse> => {
  return request.get('/admin/nft-collections', {
    params,
  });
};

export const updateNftCollection = ({
  id,
  ...rest
}: UpdateNftCollectionParams): Promise<UpdateNftCollectionResponse> => {
  return request.put(`/admin/nft-collections/${id}`, rest);
};

export const createNftCollection = (
  params: CreateNftCollectionParams
): Promise<CreateNftCollectionResponse> => {
  return request.post('/admin/nft-collections', params);
};
