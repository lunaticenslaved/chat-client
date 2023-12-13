import { Context } from '..';

import { ConnectionSocketEvents } from './connection';
import { MessageSocketEvents } from './message';

export interface ISocketEvent {
  connection: ConnectionSocketEvents;
  message: MessageSocketEvents;
}

export function createSocketEvents(context: Context): ISocketEvent {
  return {
    connection: new ConnectionSocketEvents(context),
    message: new MessageSocketEvents(context),
  };
}
