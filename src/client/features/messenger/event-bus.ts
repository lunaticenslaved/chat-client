import { EventBus } from '#/client/shared/event-bus';

export type MessagesEvents = {
  sent: undefined;
};

export const eventBus = new EventBus<MessagesEvents, keyof MessagesEvents>();
