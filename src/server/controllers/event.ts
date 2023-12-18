import { Context } from '#/server/context';

export function addEventListeners(appContext: Context) {
  const { eventBus, socketEvent: se } = appContext;

  eventBus.on('connection-created', (...args) => se.connection.onConnectionCreated(...args));
  eventBus.on('message-created', (...args) => se.message.onMessageCreated(...args));
  eventBus.on('message-deleted', (...args) => se.message.onMessageDeleted(...args));
}
