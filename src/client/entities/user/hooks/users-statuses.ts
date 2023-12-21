import { useEffect, useMemo } from 'react';

import { UserEventsListener, userActions } from '#/api/user';
import { socket } from '#/client/shared/socket-context';
import { store, useAppDispatch } from '#/store';

import { UnblockUserResponse } from '../../../../api/user/types';
import {
  BlockUserResponse,
  WasBlockedByResponse,
  WasUnblockedByResponse,
} from '../../../../api/user/types';

const usersEventsListeners = new UserEventsListener(socket);

export function useFetchUsersStatuses() {
  const dispatch = useAppDispatch();

  const { wasBlockedBy, wasUnblockedBy, userWasBlocked, userWasUnblocked } = useMemo(
    () => ({
      wasBlockedBy({ userId }: WasBlockedByResponse) {
        dispatch(store.users.actions.setStatusForUserWhoBlockedMe({ id: userId, status: true }));
      },
      wasUnblockedBy({ userId }: WasUnblockedByResponse) {
        dispatch(store.users.actions.setStatusForUserWhoBlockedMe({ id: userId, status: false }));
      },
      userWasBlocked({ userId }: BlockUserResponse) {
        dispatch(store.users.actions.setStatusForBlockedUser({ id: userId, status: true }));
      },
      userWasUnblocked({ userId }: UnblockUserResponse) {
        dispatch(store.users.actions.setStatusForBlockedUser({ id: userId, status: false }));
      },
    }),
    [dispatch],
  );

  useEffect(() => {
    userActions
      .listUsersStatuses({ data: undefined })
      .then(({ blockedUsers, usersWhoBlockedMe, onlineUsers }) => {
        dispatch(store.users.actions.setOnlineUsers(onlineUsers));
        dispatch(store.users.actions.setBlockedUsers(blockedUsers));
        dispatch(store.users.actions.setUsersWhoBlockedMe(usersWhoBlockedMe));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    usersEventsListeners.on('was-blocked-by', wasBlockedBy);
    usersEventsListeners.on('was-unblocked-by', wasUnblockedBy);
    usersEventsListeners.on('user-blocked', userWasBlocked);
    usersEventsListeners.on('user-unblocked', userWasUnblocked);

    return () => {
      usersEventsListeners.off('was-blocked-by', wasBlockedBy);
      usersEventsListeners.off('was-unblocked-by', wasUnblockedBy);
      usersEventsListeners.off('user-blocked', userWasBlocked);
      usersEventsListeners.off('user-unblocked', userWasUnblocked);
    };
  }, [userWasBlocked, userWasUnblocked, wasBlockedBy, wasUnblockedBy]);
}
