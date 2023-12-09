import { Dialog } from '#/domain/dialog';

import { SocketEventListener } from '../socket-listener';

import { DialogServerEvent, ListDialogsResponse } from './types';

export class DialogEventsListener extends SocketEventListener {
  dialogCreated(fn: (data: Dialog) => void) {
    this.socket.on(DialogServerEvent.Created, fn);
  }

  listDialogs(fn: (data: ListDialogsResponse) => void) {
    this.socket.on(DialogServerEvent.Listed, fn);
  }

  destroy() {
    this.socket.off(DialogServerEvent.Created);
  }
}
