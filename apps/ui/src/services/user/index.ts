import { GetMyProfileResponse } from './types';
import request from '@/utils/request';

export const getMyProfile = (): Promise<GetMyProfileResponse> => {
  return request.get('/users/me/profile');
};
