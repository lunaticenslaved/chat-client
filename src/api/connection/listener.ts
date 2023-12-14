import { SocketEventListener } from '../socket-listener';

import { ConnectionServerEvent, CreateConnectionResponse } from './types';

export class ConnectionEventsListener extends SocketEventListener {
  connectionCreated(fn: (data: CreateConnectionResponse) => void) {
    this.addListener(ConnectionServerEvent.Created, fn);
  }
}
