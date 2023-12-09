import { Socket } from 'socket.io';

import schema from '@lunaticenslaved/schema';

import { DialogServerEvent } from '#/api/dialog';
import { MessageServerEvent, SendMessageRequest, SendMessageResponse } from '#/api/message';
import { Context } from '#/server/context';
import { logger } from '#/server/shared';

export async function create(
  data: SendMessageRequest,
  socket: Socket,
  context: Context,
): Promise<SendMessageResponse> {
  let dialogId = '';

  logger.info(`[SOCKET][MESSAGE] Create message:\n ${JSON.stringify(data)}`);

  const { text } = data;
  const { token } = socket.handshake.auth;
  // TODO can I get userId from token? Add viewer.getUserId to auth server
  const { user: author } = await schema.actions.viewer.get({
    token,
    data: undefined,
    config: {
      headers: {
        Origin: socket.request.headers.origin,
      },
    },
  });

  if (data.type === 'new_dialog') {
    const dialog = await context.service.dialog.create({
      partnerId: data.userId,
      ownerId: author.id,
    });

    socket.emit(DialogServerEvent.Created, () => {
      socket.emit(JSON.stringify(dialog));
    });

    dialogId = dialog.id;
  } else {
    dialogId = data.dialogId;
  }

  const message = await context.service.message.create({
    dialogId,
    text,
    authorId: author.id,
  });

  socket.emit(MessageServerEvent.Created, message);

  return { ...message, author };
}
