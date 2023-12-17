import { AuthEventServer } from '#/api/auth/types';

import { SocketEventListener } from '../socket-listener';

type AuthEvents = {
  'token-invalid': void;
  'token-expired': void;
};

export class AuthEventsListener extends SocketEventListener<
  AuthEvents,
  keyof AuthEvents,
  AuthEventServer
> {
  override eventsMap = {
    'token-invalid': AuthEventServer.InvalidToken,
    'token-expired': AuthEventServer.ExpiredToken,
  };
}
