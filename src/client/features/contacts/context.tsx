import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { message } from 'antd';

import { UpdateContactRequest, contactsActions } from '#/api/contact';
import { useAddContact, useRemoveContact } from '#/client/entities/contact';
import { Contact } from '#/domain/contact';
import { store, useAppDispatch, useAppSelector } from '#/store';

import { IContactsSearch, useSearch } from './hooks/search';

export type UpdateContactData = Omit<UpdateContactRequest, 'contactId'>;

interface IContactsContext {
  contacts: Contact[];
  removeContact(contactId: string): Promise<void>;
  updateContact(contactId: string, data: UpdateContactData): Promise<void>;
  addContact(userId: string): Promise<Contact>;
  search: IContactsSearch;
}

const Context = createContext<IContactsContext | null>(null);

interface ContactsContextProps {
  children: ReactNode;
}

export function ContactsContext({ children }: ContactsContextProps) {
  const contacts = useAppSelector(store.contacts.selectors.selectContacts);
  const dispatch = useAppDispatch();
  const { data, refetch, isFetched } = useQuery(['contacts/list'], () =>
    contactsActions.listContacts({ data: undefined }),
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

  const updateContact: IContactsContext['updateContact'] = useCallback(
    async (contactId, data) => {
      await contactsActions
        .updateContact({
          data: { ...data, contactId },
        })
        .then(({ contact }) => {
          dispatch(store.contacts.actions.replaceContact(contact));
        })
        .catch(() => {
          message.error('Cannot update contact');
          refetch();
        });
      return Promise.resolve();
    },
    [dispatch, refetch],
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
      updateContact,
    }),
    [search, contacts, addContact, removeContact, updateContact],
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
