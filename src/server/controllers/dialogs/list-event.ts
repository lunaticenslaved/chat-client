import { Socket } from 'socket.io';

import schema from '@lunaticenslaved/schema';
import { ApiError } from '@lunaticenslaved/schema/dist/types/errors';

import { DialogServerEvent, ListDialogsRequest } from '#/api/dialog';
import { Context } from '#/server/context';
import { logger } from '#/server/shared';

export async function list(data: ListDialogsRequest, socket: Socket, context: Context) {
  try {
    logger.info(`[SOCKET][DIALOG] List dialogs:\n ${JSON.stringify(data)}`);

    const { token } = socket.handshake.auth;
    const origin = socket.request.headers.origin || '';
    // TODO can I get userId from token? Add viewer.getUserId to auth server
    const { user } = await schema.actions.viewer.get({
      token,
      data: undefined,
      config: {
        headers: { Origin: origin },
      },
    });

    const dialogs = await context.metaService.dialog.listWithPartners({
      origin,
      take: data.take,
      ownerId: user.id,
    });

    socket.emit(DialogServerEvent.Listed, {
      data: dialogs,
      error: null,
    });
  } catch (e) {
    socket.emit(DialogServerEvent.Listed, {
      data: null,
      error: e as ApiError,
    });
  }
}
