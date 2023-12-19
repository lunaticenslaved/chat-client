import { User } from './utils';

export type CreateUserResponse = User;
export type CreateUserRequest = {
  id: string;
  socketId?: string;
  isOnline?: boolean;
};

export type AddSocketToUserResponse = User;
export type AddSocketToUserRequest = {
  userId: string;
  socketId: string;
};

export type RemoveSocketResponse = void;
export type RemoveSocketRequest = {
  socketId: string;
};

export type FindUserRequest = { id: string };
export type FindUserResponse = User | undefined;

export type CreateOrUpdateUserRequest = CreateUserRequest;
export type CreateOrUpdateUserResponse = User;

export type UpdateUserRequest = CreateUserRequest;
export type UpdateUserResponse = User;
