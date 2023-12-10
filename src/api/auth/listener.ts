import { SocketEventListener } from '../socket-listener';

import { AuthEventServer } from './types';

export class AuthEventsListener extends SocketEventListener {
  onTokenInvalid(fn: () => void) {
    this.addListener(AuthEventServer.InvalidToken, () => {
      console.log('INVALID TOKEN IN SOCKET');
      fn();
    });
  }

  onTokenExpired(fn: () => void) {
    this.addListener(AuthEventServer.ExpiredToken, () => {
      console.log('EXPIRED TOKEN IN SOCKET');
      fn();
    });
  }
}
