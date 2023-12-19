import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react';

import { ConnectionEventsListener } from '#/api/connection';
import { MessageEventsListener } from '#/api/message';
import { socket } from '#/client/shared/socket-context';
import { Connection } from '#/domain/connection';
import { Message } from '#/domain/message';
import { User } from '#/domain/user';

import { IConnectionInfo, useConnectionInfo } from './hooks/connection-info';
import { useConnections } from './hooks/connections';
import { IMessage, useMessage } from './hooks/message';
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
  deleteMessage: IMessage['deleteMessage'];
  sendMessage: IMessage['sendMessage'];

  // Connections
  connections: Connection[];
  setSelectedConnection(connection: Connection): void;
  connectionInfo: IConnectionInfo;

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

const messagesListener = new MessageEventsListener(socket);
const connectionsListener = new ConnectionEventsListener(socket);

function useMessenger(): IMessengerContext {
  const {
    searchQuery,
    setSearchQuery,
    selectedUser,
    setSelectedUser,
    foundConnections,
    foundUsers,
  } = useSearch();
  const { connections, setCurrentConnection, currentConnection, updateLastMessage, addConnection } =
    useConnections();

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
    addMessage,
    removeMessageFromList,
  } = useMessages({ selectedItem });

  const { sendMessage, deleteMessage } = useMessage({ selectedItem });

  const connectionInfo = useConnectionInfo(selectedItem);

  useEffect(() => {
    // FIXME handle error
    messagesListener.on('created', addMessage);
    messagesListener.on('created', updateLastMessage);
    messagesListener.on('deleted', removeMessageFromList);
    connectionsListener.on('created', addConnection);

    return () => {
      messagesListener.off('created', addMessage);
      messagesListener.off('created', updateLastMessage);
      connectionsListener.off('created', addConnection);
    };
  }, [addConnection, addMessage, removeMessageFromList, updateLastMessage]);

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
      deleteMessage,

      // Connections
      connections,
      connectionInfo,
      setSelectedConnection(value) {
        setSearchQuery('');
        setCurrentConnection(value);
      },

      // User
      setSelectedUser,
    }),
    [
      connectionInfo,
      connections,
      deleteMessage,
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
