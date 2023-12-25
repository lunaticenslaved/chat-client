import { EventBus } from '#/client/shared/event-bus';
import { Message } from '#/domain/message';

export type MessagesEvents = {
  sent: undefined;
  received: Message;
};

export const eventBus = new EventBus<MessagesEvents, keyof MessagesEvents>();
