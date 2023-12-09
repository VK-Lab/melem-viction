import { SiweMessage } from 'siwe';

import { User } from '@/types/user';

export type LoginParams = {
  signature: string;
  message: SiweMessage;
};

export type LoginResponse = {
  accessToken: string;
  isVerifyPhone?: boolean;
};

export type GetNonceResponse = {
  nonce: string;
};

export type VerifyPhoneNumberOtpParams = {
  otpCode: string;
};

export type RegisterPhoneNumberParams = {
  phoneNumber: string;
};

export type UserIdResponse = {
  userId: string;
  accessToken: string;
};

export type CheckUserResponse = User;

export type CheckPhoneVerfiedResponse = {
  isPhoneVerfied: boolean;
};
