import { Context } from '..';

import { DialogSocketEvents } from './dialog';
import { MessageSocketEvents } from './message';

export interface ISocketEvent {
  dialog: DialogSocketEvents;
  message: MessageSocketEvents;
}

export function createSocketEvents(context: Context): ISocketEvent {
  return {
    dialog: new DialogSocketEvents(context),
    message: new MessageSocketEvents(context),
  };
}
