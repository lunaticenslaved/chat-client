import { Socket } from 'socket.io';

import schema from '@lunaticenslaved/schema';

import { CreateDialogResponse, DialogServerEvent, UpdateDialogResponse } from '#/api/dialog';
import { MessageServerEvent, SendMessageRequest, SendMessageResponse } from '#/api/message';
import { Context } from '#/server/context';
import { DialogFullWithPartner } from '#/server/models';
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
    const { id } = await context.service.dialog.create({
      userId: data.userId,
      ownerId: author.id,
    });

    dialogId = id;
  } else {
    dialogId = data.dialogId;
  }

  const message = await context.service.message.create({
    dialogId,
    text,
    authorId: author.id,
  });

  const rawDialog = await context.service.dialog.get({ dialogId });
  const { user } = await schema.actions.users.get({
    data: { userId: rawDialog.userId },
    token,
    config: {
      headers: {
        Origin: socket.request.headers.origin,
      },
    },
  });

  const dialog: DialogFullWithPartner = { ...rawDialog, user };

  if (data.type === 'new_dialog') {
    const dialogResponse: CreateDialogResponse = {
      data: dialog,
      error: null,
    };

    socket.emit(DialogServerEvent.Created, dialogResponse);
  }

  const dialogUpdate: UpdateDialogResponse = {
    error: null,
    data: dialog,
  };

  socket.emit(DialogServerEvent.Updated, dialogUpdate);

  const response: SendMessageResponse = { ...message, author };

  socket.emit(MessageServerEvent.Created, response);

  return response;
}
