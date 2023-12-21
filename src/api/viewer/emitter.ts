import { SocketEventsEmitter } from '../socket-emitter';

import { ViewerClientEvents } from './types';

export class ViewerEventsEmitter extends SocketEventsEmitter {
  isOnline() {
    this.socket.emit(ViewerClientEvents.isOnline);
  }

  isOffline() {
    this.socket.emit(ViewerClientEvents.isOffline);
  }
}
