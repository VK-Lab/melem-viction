import { RoleEnum, User } from '@/types/user';

export const isAdmin = (user: User) => {
  return user.roles && user.roles.includes(RoleEnum.ADMIN);
};
