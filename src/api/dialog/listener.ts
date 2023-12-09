import { Dialog } from '#/domain/dialog';

import { SocketEventListener } from '../socket-listener';

import { DialogServerEvent } from './types';

export class DialogEventsListener extends SocketEventListener {
  dialogCreated(fn: (data: Dialog) => void) {
    this.socket.on(DialogServerEvent.Created, fn);
  }
}
