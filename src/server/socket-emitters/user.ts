import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { ViewerIsOfflineResponse, ViewerIsOnlineResponse, ViewerServerEvents } from '#/api/viewer';
import { SocketServer } from '#/server/socket-server';

import { SocketEventEmitter } from './base-socket-emitter';

class UserEventsEmitter extends SocketEventEmitter {
  onUserIsOnline(userId: string) {
    const data: OperationResponse<ViewerIsOnlineResponse> = {
      data: { userId },
      error: null,
    };

    SocketServer.emitToAllUsersForUser(userId, ViewerServerEvents.isOnline, data);
  }

  onUserIsOffline(userId: string) {
    const data: OperationResponse<ViewerIsOfflineResponse> = {
      data: { userId },
      error: null,
    };

    SocketServer.emitToAllUsersForUser(userId, ViewerServerEvents.isOffline, data);
  }
}

export const userEventsEmitter = new UserEventsEmitter();
