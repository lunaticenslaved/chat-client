import { UsersService } from './service';

export * from './types';
export { type User } from './utils';

export const usersService = new UsersService();
