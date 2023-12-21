import { SocketEventListener } from '../socket-listener';

import {
  BlockUserResponse,
  UnblockUserResponse,
  UserIsOfflineResponse,
  UserIsOnlineResponse,
  UserServerEvents,
  WasBlockedByResponse,
  WasUnblockedByResponse,
} from './types';

type UserEvents = {
  'user-is-offline': UserIsOfflineResponse;
  'user-is-online': UserIsOnlineResponse;
  'was-blocked-by': WasBlockedByResponse;
  'was-unblocked-by': WasUnblockedByResponse;
  'user-blocked': BlockUserResponse;
  'user-unblocked': UnblockUserResponse;
};

export class UserEventsListener extends SocketEventListener<
  UserEvents,
  keyof UserEvents,
  UserServerEvents
> {
  override eventsMap = {
    'user-is-offline': UserServerEvents.IsOffline,
    'user-is-online': UserServerEvents.IsOnline,
    'was-blocked-by': UserServerEvents.WasBlockedBy,
    'was-unblocked-by': UserServerEvents.WasUnblockedBy,
    'user-blocked': UserServerEvents.UserBlocked,
    'user-unblocked': UserServerEvents.UserUnblocked,
  };
}
