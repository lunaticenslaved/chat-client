import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { searchActions } from '#/api/search';
import { useDebouncedState } from '#/client/shared/hooks';
import { Connection } from '#/domain/connection';
import { User } from '#/domain/user';
import { store, useAppDispatch, useAppSelector } from '#/store';

export type UseSearchProps = {
  fetch: boolean;
};

export interface UseSearch {
  foundUsers: User[];
  foundConnections: Connection[];
  isSearching: boolean;
  isSearchingError: boolean;
  selectedUser?: User;
  searchQuery?: string;
  setSearchQuery(value?: string): void;
  setSelectedUser(value?: User): void;
}

export function useSearch({ fetch }: UseSearchProps): UseSearch {
  const selectedUser = useAppSelector(store.search.selectors.selectUser);
  const searchQuery = useAppSelector(store.search.selectors.selectQuery);
  const dispatch = useAppDispatch();

  const [query] = useDebouncedState(searchQuery, 300);

  const { data, isLoading, isError } = useQuery(
    ['search/in-connections', searchQuery || ''],
    () => searchActions.inChannels({ data: { search: query || '' } }),
    { enabled: fetch },
  );

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
    foundConnections: data?.connections || [],
    foundUsers: data?.users || [],
    isSearching: isLoading,
    isSearchingError: isError,
    selectedUser,
    setSelectedUser,
    searchQuery,
    setSearchQuery,
  };
}
