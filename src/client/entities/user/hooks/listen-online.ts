import { useEffect } from 'react';

import { ViewerEventsListener } from '#/api/viewer';
import { socket } from '#/client/shared/socket-context';
import { store, useAppDispatch } from '#/store';

const userEventsListener = new ViewerEventsListener(socket);

export function useListenUsersOnlineStatus() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function onUserOnline({ userId }: { userId: string }) {
      dispatch(store.users.actions.setUserOnlineStatus({ id: userId, status: true }));
    }
    function onUserOffline({ userId }: { userId: string }) {
      dispatch(store.users.actions.setUserOnlineStatus({ id: userId, status: false }));
    }

    userEventsListener.on('user-is-online', onUserOnline);
    userEventsListener.on('user-is-offline', onUserOffline);

    return () => {
      userEventsListener.off('user-is-online', onUserOnline);
      userEventsListener.off('user-is-offline', onUserOffline);
    };
  }, [dispatch]);
}
