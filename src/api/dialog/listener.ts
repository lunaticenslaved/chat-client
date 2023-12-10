import { SocketEventListener } from '../socket-listener';

import { CreateDialogResponse, DialogServerEvent, UpdateDialogResponse } from './types';

export class DialogEventsListener extends SocketEventListener {
  dialogCreated(fn: (data: CreateDialogResponse) => void) {
    this.addListener(DialogServerEvent.Created, fn);
  }

  dialogUpdated(fn: (data: UpdateDialogResponse) => void) {
    this.addListener(DialogServerEvent.Updated, fn);
  }
}
