import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import {
  BlockUserResponse,
  UnblockUserResponse,
  UserIsOfflineResponse,
  UserIsOnlineResponse,
  UserServerEvents,
  WasBlockedByResponse,
  WasUnblockedByResponse,
} from '#/api/user';
import { SocketServer } from '#/server/socket-server';

import { SocketEventEmitter } from '../base-socket-emitter';

import { OnUserWasBlocked, OnUserWasUnblocked } from './types';

export class UserEventsEmitter extends SocketEventEmitter {
  onUserIsOnline(userId: string) {
    const data: OperationResponse<UserIsOnlineResponse> = {
      data: { userId },
      error: null,
    };

    SocketServer.emitToAllUsersForUser(userId, UserServerEvents.IsOnline, data);
  }

  onUserIsOffline(userId: string) {
    const data: OperationResponse<UserIsOfflineResponse> = {
      data: { userId },
      error: null,
    };

    SocketServer.emitToAllUsersForUser(userId, UserServerEvents.IsOffline, data);
  }

  onUserWasBlocked({ userId, ownerId }: OnUserWasBlocked) {
    const wasBlockedBy: OperationResponse<WasBlockedByResponse> = {
      data: { userId: ownerId },
      error: null,
    };
    const blockedUser: OperationResponse<BlockUserResponse> = {
      data: { userId },
      error: null,
    };

    SocketServer.emitToUser(userId, UserServerEvents.WasBlockedBy, wasBlockedBy);
    SocketServer.emitToUser(ownerId, UserServerEvents.UserBlocked, blockedUser);
  }

  onUserWasUnblocked({ userId, ownerId }: OnUserWasUnblocked) {
    const wasUnblockedBy: OperationResponse<WasUnblockedByResponse> = {
      data: { userId: ownerId },
      error: null,
    };
    const unblockedUser: OperationResponse<UnblockUserResponse> = {
      data: { userId },
      error: null,
    };

    SocketServer.emitToUser(userId, UserServerEvents.WasUnblockedBy, wasUnblockedBy);
    SocketServer.emitToUser(ownerId, UserServerEvents.UserUnblocked, unblockedUser);
  }
}
