import { SocketEventListener } from '../socket-listener';

import { ConnectionServerEvent, CreateConnectionResponse } from './types';

type ConnectionEvents = {
  created: CreateConnectionResponse;
};

export class ConnectionEventsListener extends SocketEventListener<
  ConnectionEvents,
  keyof ConnectionEvents,
  ConnectionServerEvent
> {
  override eventsMap = {
    created: ConnectionServerEvent.Created,
  };
}
