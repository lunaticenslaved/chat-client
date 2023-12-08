import { CreateMessageRequest, CreateMessageResponse } from '@api/messages';
import { Socket } from 'socket.io';

import schema from '@lunaticenslaved/schema';

import { Context } from '@/context';
import { logger } from '@/shared';

export async function create(
  data: CreateMessageRequest,
  socket: Socket,
  context: Context,
): Promise<CreateMessageResponse> {
  let dialogId = '';

  logger.info(`[SOCKET][MESSAGE] Create message:\n ${JSON.stringify(data)}`);

  const { text } = data;
  const { token } = socket.handshake.auth;
  // TODO can I get userId from token?
  const { user } = await schema.actions.viewer.get({
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
      ownerId: user.id,
    });

    dialogId = dialog.id;
  } else {
    dialogId = data.dialogId;
  }

  const message = await context.service.message.create({
    dialogId,
    text,
    authorId: user.id,
  });

  return message;
}
