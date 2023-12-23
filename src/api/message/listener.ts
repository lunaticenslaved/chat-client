import { DeleteMessageResponse, MessageServerEvent } from '#/api/message/types';
import { Message } from '#/domain/message';

import { SocketEventListener } from '../socket-listener';

type MessageEvents = {
  created: Message;
  deleted: DeleteMessageResponse;
  updated: Message;
};

export class MessageEventsListener extends SocketEventListener<
  MessageEvents,
  keyof MessageEvents,
  MessageServerEvent
> {
  override eventsMap = {
    created: MessageServerEvent.Created,
    deleted: MessageServerEvent.Deleted,
    updated: MessageServerEvent.Updated,
  };
}
