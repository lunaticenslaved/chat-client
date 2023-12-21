import { usersService } from '#/server/service/users';
import { utils } from '#/server/shared';
import { userEventsEmitter } from '#/server/socket-emitters/user';

import { ViewerClientEvents } from '../../../api/viewer/types';

export const addViewerEvents = utils.app.createSocketEvents(eventContext => {
  eventContext.socket.on(ViewerClientEvents.isOnline, () => {
    if (!eventContext.userId) return;

    usersService.updateUser({ id: eventContext.userId, isOnline: true });
    userEventsEmitter.onUserIsOnline(eventContext.userId);
  });

  eventContext.socket.on(ViewerClientEvents.isOffline, () => {
    if (!eventContext.userId) return;

    usersService.updateUser({ id: eventContext.userId, isOnline: false });
    userEventsEmitter.onUserIsOffline(eventContext.userId);
  });
});
