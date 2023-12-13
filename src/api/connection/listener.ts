import { SocketEventListener } from '../socket-listener';

import { ConnectionServerEvent, CreateConnectionResponse, UpdateConnectionResponse } from './types';

export class ConnectionEventsListener extends SocketEventListener {
  connectionCreated(fn: (data: CreateConnectionResponse) => void) {
    this.addListener(ConnectionServerEvent.Created, fn);
  }

  connectionUpdated(fn: (data: UpdateConnectionResponse) => void) {
    this.addListener(ConnectionServerEvent.Updated, fn);
  }
}
