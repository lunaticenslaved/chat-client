import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { contactsActions } from '#/api/contact';
import { Handlers } from '#/client/shared/types';
import { Contact } from '#/domain/contact';

interface IAddContact {
  isError: boolean;
  isLoading: boolean;
  addContact(userId: string): Promise<Contact>;
}

export function useAddContact(handlers?: Handlers<Contact>): IAddContact {
  const {
    mutateAsync: addContact,
    isError,
    isLoading,
  } = useMutation({
    mutationKey: ['contacts/add'],
    mutationFn: (userId: string) =>
      contactsActions.addUser({ data: { userId } }).then(({ contact }) => contact),
    onSuccess(contact) {
      handlers?.onSuccess?.(contact);
    },
    onError(error) {
      handlers?.onError?.(error as Error);
    },
  });

  return {
    isError,
    isLoading,
    addContact,
  };
}

interface IToggleUserInContacts {
  isLoading: boolean;
  isInContacts: boolean;
  toggleUserInContacts?(): Promise<void>;
}

export function useToggleUserInContacts(userId: string): IToggleUserInContacts {
  const [contact, setContact] = useState<Contact>();

  useEffect(() => {
    setContact(undefined);
  }, [userId]);

  useQuery(
    ['contacts/get-contact-for-user', userId],
    () => contactsActions.getContactForUser({ data: { userId } }),
    {
      onSuccess({ contact }) {
        setContact(contact);
      },
    },
  );

  const { mutateAsync: toggleUserInContacts, isLoading } = useMutation({
    mutationKey: ['contacts/toggle-user', userId],
    mutationFn: async () => {
      if (!contact) {
        await contactsActions
          .addUser({ data: { userId } })
          .then(({ contact }) => setContact(contact));
      } else {
        await contactsActions
          .removeContact({ data: { contactId: contact.id } })
          .then(() => setContact(undefined));
      }
    },
  });

  return {
    isLoading,
    isInContacts: !!contact,
    toggleUserInContacts,
  };
}
