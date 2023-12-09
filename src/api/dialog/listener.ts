import { SocketEventListener } from '../socket-listener';

import { CreateDialogResponse, DialogServerEvent, UpdateDialogResponse } from './types';

export class DialogEventsListener extends SocketEventListener {
  dialogCreated(fn: (data: CreateDialogResponse) => void) {
    this.socket.on(DialogServerEvent.Created, fn);
  }

  dialogUpdated(fn: (data: UpdateDialogResponse) => void) {
    this.socket.on(DialogServerEvent.Updated, fn);
  }
}
