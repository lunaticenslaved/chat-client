import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { contactsActions } from '#/api/contact';
import { useDebouncedState } from '#/client/shared/hooks';
import { Contact } from '#/domain/contact';
import { User } from '#/domain/user';

export interface IContactsSearch {
  query: string;
  myContacts: Contact[];
  users: User[];
  isLoading: boolean;
  setQuery(value: string): void;
  clearQuery(): void;
  refetch(): void;
}

export function useSearch(): IContactsSearch {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedState(query, 150);

  const { data, isLoading, refetch } = useQuery(
    ['contacts/search', debouncedQuery],
    () => contactsActions.search({ data: { search: debouncedQuery } }),
    { enabled: !!debouncedQuery },
  );

  return useMemo(
    (): IContactsSearch => ({
      refetch,
      query,
      setQuery,
      isLoading,
      myContacts: data?.myContacts || [],
      users: data?.users || [],
      clearQuery: () => setQuery(''),
    }),
    [data?.myContacts, data?.users, isLoading, query, refetch],
  );
}
