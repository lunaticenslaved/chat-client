import { User } from '#/domain/user';

interface UserId {
  userId: string;
}

export enum UserServerEvents {
  IsOnline = 'USER:ONLINE',
  IsOffline = 'USER:OFFLINE',

  WasBlockedBy = 'USER:WAS_BLOCKED_BY',
  WasUnblockedBy = 'USER:WAS_UNBLOCKED_BY',

  UserBlocked = 'USER:BLOCKED_USER',
  UserUnblocked = 'USER:UNBLOCKED_USER',
}

export type BlockUserRequest = UserId;
export type UnblockUserRequest = UserId;

export type UserIsOnlineResponse = UserId;
export type UserIsOfflineResponse = UserId;

export type WasBlockedByResponse = UserId;
export type WasUnblockedByResponse = UserId;

export type BlockUserResponse = UserId;
export type UnblockUserResponse = UserId;

export interface ListUsersStatusesResponse {
  onlineUsers: { id: string }[];
  blockedUsers: { id: string }[];
  usersWhoBlockedMe: { id: string }[];
}

export interface ListBlockedUsersResponse {
  users: User[];
}
