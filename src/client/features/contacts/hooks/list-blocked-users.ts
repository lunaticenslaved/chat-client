import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { userActions } from '#/api/user';
import { User } from '#/domain/user';

interface IListBlockedUsers {
  users: User[];
  isLoading: boolean;
  unblockUser(userId: string): void;
}

export function useListBlockedUsers(): IListBlockedUsers {
  const [users, setUsers] = useState<User[]>([]);
  const { isLoading } = useQuery(
    'contacts/blocked-users',
    () => userActions.listBlockedUsers({ data: undefined }),
    {
      onSuccess(data) {
        setUsers(data.users);
      },
    },
  );

  const { unblockUser } = useMemo(
    () => ({
      unblockUser(userId: string) {
        userActions.unblockUser({ data: { userId } });
        setUsers(users => users.filter(user => user.id !== userId));
      },
    }),
    [],
  );

  return useMemo(
    () => ({
      unblockUser,
      isLoading,
      users,
    }),
    [isLoading, unblockUser, users],
  );
}
