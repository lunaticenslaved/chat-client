import { Errors } from '@lunaticenslaved/schema';

import { SendMessageRequest } from '#/api/message';
import { ConnectionType } from '#/domain/connection';
import { Message } from '#/domain/message';
import { IContext, createSocketOperation } from '#/server/context';
import { logger } from '#/server/shared';
import { prepareNever } from '#/server/shared/utils';

type AddUserToConnectionRequest = {
  userId: string;
  connectionId: string;
  appContext: IContext;
};

function addUserToConnection(data: AddUserToConnectionRequest) {
  const { connectionId, userId, appContext } = data;
  const socketId = appContext.socketMap.getSocketId(userId);

  if (!socketId) return;

  const namespace = appContext.socketServer.of('/');
  const socket = namespace.sockets.get(socketId);

  if (!socket) return;

  socket.join(connectionId);
}

export const create = createSocketOperation<SendMessageRequest>(
  async (data, eventContext, appContext) => {
    logger.info(`[SOCKET][MESSAGE] Create message:\n ${JSON.stringify(data)}`);

    const authorId = eventContext.userId;

    if (!authorId) {
      logger.error(`[SOCKET][MESSAGE] Not authorized`);

      throw new Errors.UnauthorizedError({ messages: 'Not authorized' });
    }

    let message: Message | undefined;

    if ('userId' in data) {
      const partnerId = data.userId;
      const { action, connection } = await appContext.metaService.connection.createOneToOne(
        eventContext,
        {
          partnerId: partnerId,
          message: {
            text: data.text,
          },
        },
      );

      message = connection.lastMessage;

      // connect the two users the connection
      const connectionId = connection.id;
      addUserToConnection({ connectionId, userId: authorId, appContext });
      addUserToConnection({ connectionId, userId: partnerId, appContext });

      switch (action) {
        case 'created':
          appContext.socketEvent.connection.onOneToOneCreated(eventContext, connection);
          break;
        case 'updated':
          appContext.socketEvent.connection.onOneToOneUpdated(eventContext, connection);
          break;
        default:
          prepareNever(action);
      }
    } else {
      const { connectionId } = data;

      message = await appContext.metaService.message.create(eventContext, {
        authorId,
        connectionId,
        text: data.text,
      });

      const connection = await appContext.metaService.connection.get(eventContext, {
        connectionId,
      });

      // FIXME send for all connections
      if (connection.type === ConnectionType.OneToOne) {
        appContext.socketEvent.connection.onOneToOneUpdated(eventContext, connection);
      }
    }

    if (message) {
      appContext.socketEvent.message.onMessageCreated(message);
    }
  },
);
