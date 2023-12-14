import { Context } from '#/server/context';

export function addEventListeners(appContext: Context) {
  const { eventBus, socketEvent } = appContext;

  eventBus.on('connection-created', (...args) =>
    socketEvent.connection.onConnectionCreated(...args),
  );
  eventBus.on('message-created', (...args) => socketEvent.message.onMessageCreated(...args));
}
