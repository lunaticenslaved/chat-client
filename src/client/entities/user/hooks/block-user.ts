import { useCallback, useMemo } from 'react';

import { userActions } from '#/api/user';
import { store, useAppDispatch, useAppSelector } from '#/store';

interface IBlockUser {
  toggleBlocked(): void;
  blockUser(): void;
  unblockUser(): void;
  isUserBlocked: boolean;
  isMeBlockedByUser: boolean;
}

export function useBlockUser(userId: string): IBlockUser {
  const dispatch = useAppDispatch();
  const blockedUsers = useAppSelector(store.users.selectors.selectBlockedUsers);
  const usersWhoBlockedMe = useAppSelector(store.users.selectors.selectUsersWhoBlockedMe);

  const isUserBlocked = blockedUsers[userId] || false;
  const isMeBlockedByUser = usersWhoBlockedMe[userId] || false;

  const { blockUser, unblockUser } = useMemo(() => {
    return {
      blockUser() {
        userActions.blockUser({ data: { userId } });
        dispatch(store.users.actions.setStatusForBlockedUser({ id: userId, status: true }));
      },
      unblockUser() {
        userActions.unblockUser({ data: { userId } });
        dispatch(store.users.actions.setStatusForBlockedUser({ id: userId, status: false }));
      },
    };
  }, [dispatch, userId]);

  const toggleBlocked = useCallback(() => {
    if (!isUserBlocked) {
      blockUser();
    } else {
      unblockUser();
    }
  }, [blockUser, isUserBlocked, unblockUser]);

  return useMemo(
    () => ({
      blockUser,
      unblockUser,
      toggleBlocked,
      isUserBlocked,
      isMeBlockedByUser,
    }),
    [blockUser, isMeBlockedByUser, isUserBlocked, toggleBlocked, unblockUser],
  );
}
