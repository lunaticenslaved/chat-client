import { Socket } from 'socket.io';

import schema from '@lunaticenslaved/schema';

import { SendMessageRequest } from '#/api/message';
import { Context, createSocketOperation } from '#/server/context';
import { DialogFullWithPartner } from '#/server/models';
import { logger } from '#/server/shared';

export const create = createSocketOperation(
  async (data: SendMessageRequest, socket: Socket, context: Context) => {
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
      const foundDialog = await context.service.dialog.findOne({
        userId: data.userId,
        ownerId: author.id,
      });

      if (foundDialog) {
        dialogId = foundDialog.id;
      } else {
        const { id } = await context.service.dialog.create({
          userId: data.userId,
          ownerId: author.id,
        });

        dialogId = id;
      }
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
      context.socketEvent.dialog.onDialogCreated(socket, dialog);
    }

    context.socketEvent.dialog.onDialogUpdated(socket, dialog);

    context.socketEvent.message.onMessageCreate(socket, { ...message, author });
  },
);
