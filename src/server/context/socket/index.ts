import { DialogSocketEvents } from './dialog';
import { MessageSocketEvents } from './message';

export interface ISocketEvent {
  dialog: DialogSocketEvents;
  message: MessageSocketEvents;
}

export function createSocketEvents(): ISocketEvent {
  return {
    dialog: new DialogSocketEvents(),
    message: new MessageSocketEvents(),
  };
}
