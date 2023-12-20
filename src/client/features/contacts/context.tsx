import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { contactsActions } from '#/api/contact';
import { useAddContact, useRemoveContact } from '#/client/entities/contact';
import { Contact } from '#/domain/contact';
import { store, useAppDispatch, useAppSelector } from '#/store';

import { IContactsSearch, useSearch } from './hooks/search';

interface IContactsContext {
  contacts: Contact[];
  removeContact(contactId: string): Promise<void>;
  addContact(userId: string): Promise<Contact>;
  search: IContactsSearch;
  refetch(): void;
}

const Context = createContext<IContactsContext | null>(null);

interface ContactsContextProps {
  children: ReactNode;
}

export function ContactsContext({ children }: ContactsContextProps) {
  const contacts = useAppSelector(store.contacts.selectors.selectContacts);
  const dispatch = useAppDispatch();
  const { data, refetch, isFetched } = useQuery(
    ['contacts/list'],
    () => contactsActions.listContacts({ data: undefined }),
    {
      enabled: false,
    },
  );

  const search = useSearch();

  const { setContacts } = useMemo(
    () => ({
      setContacts(contacts: Contact[]) {
        if (!isFetched) return;
        dispatch(store.contacts.actions.setContacts(contacts));
      },
    }),
    [dispatch, isFetched],
  );

  const { removeContact } = useRemoveContact({
    onSuccess(contactId) {
      if (!isFetched) return;
      dispatch(store.contacts.actions.removeContact({ id: contactId }));
      search.refetch();
    },
  });
  const { addContact } = useAddContact({
    onSuccess(contact) {
      if (!isFetched) return;
      dispatch(store.contacts.actions.addContact(contact));
      search.refetch();
    },
  });

  useEffect(() => {
    setContacts(data?.contacts || []);
  }, [data, setContacts]);

  const value: IContactsContext = useMemo(
    () => ({
      search,
      contacts,
      addContact,
      removeContact,
      refetch,
    }),
    [search, contacts, addContact, removeContact, refetch],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useContactsContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Contacts context is not defined');
  }

  return context;
}
