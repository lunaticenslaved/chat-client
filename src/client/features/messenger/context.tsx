import { ReactNode, createContext, useContext, useMemo } from 'react';

import { Connection } from '#/domain/connection';
import { Message } from '#/domain/message';
import { User } from '#/domain/user';

import { useConnections } from './hooks/connections';
import { useMessages } from './hooks/messages';
import { useSearch } from './hooks/search';
import { SelectedItem } from './types';

interface IMessengerContext {
  selectedItem?: SelectedItem;

  // Search
  searchQuery?: string;
  setSearchQuery(value?: string): void;
  foundConnections: Connection[];
  foundUsers: User[];

  // Messages
  messages: Message[];
  isLoadingMessages: boolean;
  isLoadingMessagesError: boolean;
  hasMoreMessages: boolean;
  fetchMoreMessages(): void;
  sendMessage(text: string): boolean;

  // Connections
  connections: Connection[];
  setSelectedConnection(connection: Connection): void;

  // User
  setSelectedUser(user: User): void;
}

const Context = createContext<IMessengerContext | undefined>(undefined);

type MessengerContextProviderProps = {
  children(value: IMessengerContext): ReactNode;
};

function getSelectedItem(user?: User, connection?: Connection): SelectedItem | undefined {
  if (user) {
    return { type: 'user', user };
  }

  if (connection) {
    return { type: 'connection', connection };
  }

  return undefined;
}

function useMessenger(): IMessengerContext {
  const {
    searchQuery,
    setSearchQuery,
    selectedUser,
    setSelectedUser,
    foundConnections,
    foundUsers,
  } = useSearch();
  const { connections, setCurrentConnection, currentConnection } = useConnections();

  const selectedItem = useMemo(
    () => getSelectedItem(selectedUser, currentConnection),
    [currentConnection, selectedUser],
  );

  const {
    messages,
    isLoading: isLoadingMessages,
    isLoadingError: isLoadingMessagesError,
    fetchMoreMessages,
    hasMoreMessages,
    sendMessage,
  } = useMessages({ selectedItem });

  return useMemo(
    (): IMessengerContext => ({
      selectedItem,

      // Search
      searchQuery,
      setSearchQuery,
      foundConnections,
      foundUsers,

      // Messages
      messages,
      isLoadingMessages,
      isLoadingMessagesError,
      fetchMoreMessages,
      hasMoreMessages,
      sendMessage,

      // Connections
      connections,
      setSelectedConnection(value) {
        setSearchQuery('');
        setCurrentConnection(value);
      },

      // User
      setSelectedUser,
    }),
    [
      connections,
      fetchMoreMessages,
      foundConnections,
      foundUsers,
      hasMoreMessages,
      isLoadingMessages,
      isLoadingMessagesError,
      messages,
      searchQuery,
      selectedItem,
      sendMessage,
      setCurrentConnection,
      setSearchQuery,
      setSelectedUser,
    ],
  );
}

export function MessengerContext({ children }: MessengerContextProviderProps) {
  const value = useMessenger();

  return <Context.Provider value={value}>{children(value)}</Context.Provider>;
}

export function useMessengerContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Messenger context not found');
  }

  return context;
}
