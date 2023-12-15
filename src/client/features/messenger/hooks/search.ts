import { useCallback, useState } from 'react';

import { User } from '#/domain/user';
import { store, useAppDispatch, useAppSelector } from '#/store';

export interface UseSearch {
  selectedUser?: User;
  searchQuery?: string;
  setSearchQuery(value?: string): void;
  setSelectedUser(value?: User): void;
}

export function useSearch(): UseSearch {
  const [selectedUser, setSelectedUser] = useState<User>();
  const searchQuery = useAppSelector(store.dialogs.selectors.selectSearch);
  const dispatch = useAppDispatch();
  const setSearchQuery = useCallback(
    (value?: string) => {
      dispatch(store.dialogs.actions.setSearch(value));
    },
    [dispatch],
  );

  return {
    selectedUser,
    setSelectedUser,
    searchQuery,
    setSearchQuery,
  };
}
