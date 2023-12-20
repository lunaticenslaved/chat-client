import { useMutation } from 'react-query';

import { contactsActions } from '#/api/contact';
import { Handlers } from '#/client/shared/types';

interface IRemoveContact {
  isError: boolean;
  isLoading: boolean;
  removeContact(contactId: string): Promise<void>;
}

export function useRemoveContact(handlers?: Handlers<string>): IRemoveContact {
  const {
    mutateAsync: removeContact,
    isError,
    isLoading,
  } = useMutation({
    mutationKey: 'contacts/remove',
    mutationFn: (contactId: string) => contactsActions.removeContact({ data: { contactId } }),
    onSuccess(_, contactId) {
      handlers?.onSuccess?.(contactId);
    },
    onError(error) {
      handlers?.onError?.(error as Error);
    },
  });

  return {
    isError,
    isLoading,
    removeContact,
  };
}
