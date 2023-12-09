import {
  CheckUserResponse,
  GetNonceResponse,
  LoginParams,
  LoginResponse,
  RegisterPhoneNumberParams,
  UserIdResponse,
  VerifyPhoneNumberOtpParams,
} from './types';
import request from '@/utils/request';

export const getNonce = (): Promise<GetNonceResponse> => {
  return request.get('/auth/nonce');
};

export const login = (params: LoginParams): Promise<LoginResponse> => {
  return request.post('/auth/login', params);
};

export const logout = (): Promise<boolean> => {
  return request.post('/auth/logout');
};

export const verifyPhoneNumber = (
  params: VerifyPhoneNumberOtpParams
): Promise<UserIdResponse> => {
  return request.post('/auth/verify-phone-number', params);
};

export const checkPhoneVerfied = (): Promise<LoginResponse> => {
  return request.get('/auth/check-phone-verfied');
};

export const registerPhoneNumber = (
  params: RegisterPhoneNumberParams
): Promise<UserIdResponse> => {
  return request.post('/auth/register', params);
};

export const checkUser = (): Promise<CheckUserResponse> => {
  return request.post('/auth/check');
};
