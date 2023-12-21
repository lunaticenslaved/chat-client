import { useCallback, useMemo } from 'react';

import { store, useAppSelector } from '#/store';

interface IUserOnlineStatus {
  getOnlineStatus(userId: string): boolean;
}

export function useUserOnlineStatus(): IUserOnlineStatus {
  const onlineUsers = useAppSelector(store.users.selectors.selectUsers);

  const getOnlineStatus = useCallback(
    (userId: string) => {
      return onlineUsers[userId] || false;
    },
    [onlineUsers],
  );

  return useMemo(
    () => ({
      getOnlineStatus,
    }),
    [getOnlineStatus],
  );
}
