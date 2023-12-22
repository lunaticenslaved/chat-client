import { useCallback, useMemo } from 'react';

import { Contact } from '#/domain/contact';
import { store, useAppSelector } from '#/store';

interface IContactForUser {
  getContactForUser(userId: string): Contact | undefined;
}

export function useContactForUser(): IContactForUser {
  const contacts = useAppSelector(store.contacts.selectors.selectContacts);

  const getContactForUser = useCallback(
    (userId: string) => {
      return contacts.find(contact => contact.user.id === userId);
    },
    [contacts],
  );

  return useMemo(() => ({ getContactForUser }), [getContactForUser]);
}
