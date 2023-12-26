import { User } from '@/types/user';

export const isAdmin = (user: User) => {
  return user.roles;
};
