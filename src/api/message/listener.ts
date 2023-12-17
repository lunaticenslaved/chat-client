import { MessageServerEvent } from '#/api/message/types';
import { Message } from '#/domain/message';

import { SocketEventListener } from '../socket-listener';

type MessageEvents = {
  created: Message;
};

export class MessageEventsListener extends SocketEventListener<
  MessageEvents,
  keyof MessageEvents,
  MessageServerEvent
> {
  override eventsMap = {
    created: MessageServerEvent.Created,
  };
}
