import { useMemo } from 'react';

import { User } from '#/domain/user';
import { store, useAppDispatch, useAppSelector } from '#/store';

export interface UseSearch {
  selectedUser?: User;
  searchQuery?: string;
  setSearchQuery(value?: string): void;
  setSelectedUser(value?: User): void;
}

export function useSearch(): UseSearch {
  const selectedUser = useAppSelector(store.search.selectors.selectUser);
  const searchQuery = useAppSelector(store.search.selectors.selectQuery);
  const dispatch = useAppDispatch();

  const { setSearchQuery, setSelectedUser } = useMemo(
    () => ({
      setSearchQuery(value?: string) {
        dispatch(store.search.actions.setQuery(value));
      },
      setSelectedUser(value?: User) {
        dispatch(store.search.actions.setSelectedUser(value));
      },
    }),
    [dispatch],
  );

  return {
    selectedUser,
    setSelectedUser,
    searchQuery,
    setSearchQuery,
  };
}
