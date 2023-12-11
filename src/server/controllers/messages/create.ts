import { Socket } from 'socket.io';

import schema from '@lunaticenslaved/schema';

import { SendMessageRequest } from '#/api/message';
import { Context, createSocketOperation } from '#/server/context';
import { DialogFullWithUsers } from '#/server/models';
import { logger } from '#/server/shared';

export const create = createSocketOperation(
  async (data: SendMessageRequest, socket: Socket, context: Context) => {
    let dialogId = '';

    logger.info(`[SOCKET][MESSAGE] Create message:\n ${JSON.stringify(data)}`);

    const { text } = data;
    const { token } = socket.handshake.auth;
    // TODO can I get userId from token? Add viewer.getUserId to auth server
    const { user: owner } = await schema.actions.viewer.get({
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
        ownerId: owner.id,
      });

      if (foundDialog) {
        dialogId = foundDialog.id;
      } else {
        const { id } = await context.service.dialog.create({
          userId: data.userId,
          ownerId: owner.id,
        });

        dialogId = id;
      }
    } else {
      dialogId = data.dialogId;
    }

    const message = await context.service.message.create({
      dialogId,
      text,
      authorId: owner.id,
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

    const dialog: DialogFullWithUsers = { ...rawDialog, user, owner };

    if (data.type === 'new_dialog') {
      context.socketEvent.dialog.onDialogCreated({ ...dialog });
    }

    context.socketEvent.dialog.onDialogUpdated(dialog);

    context.socketEvent.message.onMessageCreate(dialog, { ...message, author: owner });
  },
);
