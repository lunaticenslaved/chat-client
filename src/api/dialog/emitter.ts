import { SocketEventsEmitter } from '../socket-emitter';

import { DialogClientEvent, ListDialogsRequest } from './types';

export class DialogEventsEmitter extends SocketEventsEmitter {
  listDialogs(data: ListDialogsRequest) {
    console.log('LIST DIALOGS REQUEST');
    this.socket.emit(DialogClientEvent.List, data);
  }
}
