import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo } from 'react';

import { ConnectionEventsListener } from '#/api/connection';
import { MessageEventsListener } from '#/api/message';
import { socket } from '#/client/shared/socket-context';
import { Connection } from '#/domain/connection';
import { Message } from '#/domain/message';
import { User } from '#/domain/user';

import { eventBus } from './event-bus';
import { IConnectionInfo, useConnectionInfo } from './hooks/connection-info';
import { useConnections } from './hooks/connections';
import { IFileUpload, useFileUpload } from './hooks/file-upload';
import { IMessage, useMessage } from './hooks/message';
import { useMessages } from './hooks/messages';
import { useSearch } from './hooks/search';
import { MessagePlaceholder, SelectedItem } from './types';

interface IMessengerContext {
  selectedItem?: SelectedItem;
  eventBus: typeof eventBus;

  // Search
  searchQuery?: string;
  setSearchQuery(value?: string): void;
  foundConnections: Connection[];
  foundUsers: User[];

  // Messages
  messages: (Message | MessagePlaceholder)[];
  isLoadingMessages: boolean;
  isLoadingMessagesError: boolean;
  hasMoreMessages: boolean;
  fetchMoreMessages(): void;
  isFetchingMoreMessages: boolean;
  deleteMessage: IMessage['deleteMessage'];
  sendMessage: IMessage['sendMessage'];
  markMessageAsRead(messageId: string): void;

  // Connections
  connections: Connection[];
  setSelectedConnection(connection: Connection): void;
  connectionInfo: IConnectionInfo;

  // User
  setSelectedUser(user: User): void;

  // Files
  filesUpload: IFileUpload;
}

const Context = createContext<IMessengerContext | undefined>(undefined);

type MessengerContextProviderProps = {
  children: ReactNode;
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
    replaceMessage,
    isFetchingMoreMessages,
  } = useMessages({ selectedItem });

  const onFilesUpload = useCallback(
    (files: File[]) => {
      console.log(files);
      const message: MessagePlaceholder = {
        files,
        id: Date.now().toString(),
        type: 'upload-files',
        isPlaceholder: true,
        createdAt: new Date().toISOString(),
      };

      addMessage(message);
    },
    [addMessage],
  );
  const filesUpload = useFileUpload({ onFilesUpload });

  const { sendMessage, deleteMessage, markMessageAsRead } = useMessage({ selectedItem });

  const connectionInfo = useConnectionInfo(selectedItem);

  const onConnectionCreated = useCallback(
    (connection: Connection) => {
      addConnection(connection);

      if (searchQuery) {
        setSearchQuery('');
        // FIXME disable refetching messages in this case
        setCurrentConnection(connection);
      }
    },
    [addConnection, searchQuery, setCurrentConnection, setSearchQuery],
  );

  useEffect(() => {
    // FIXME handle error
    messagesListener.on('created', addMessage);
    messagesListener.on('created', updateLastMessage);
    messagesListener.on('deleted', removeMessageFromList);
    messagesListener.on('updated', replaceMessage);
    connectionsListener.on('created', onConnectionCreated);

    return () => {
      messagesListener.off('created', addMessage);
      messagesListener.off('created', updateLastMessage);
      messagesListener.off('deleted', removeMessageFromList);
      messagesListener.off('updated', replaceMessage);
      connectionsListener.off('created', onConnectionCreated);
    };
  }, [addMessage, onConnectionCreated, removeMessageFromList, replaceMessage, updateLastMessage]);

  return useMemo(
    (): IMessengerContext => ({
      selectedItem,
      eventBus,

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
      markMessageAsRead,
      isFetchingMoreMessages,

      // Connections
      connections,
      connectionInfo,
      setSelectedConnection(value) {
        setSearchQuery('');
        setCurrentConnection(value);
      },

      // User
      setSelectedUser,

      // File
      filesUpload,
    }),
    [
      connectionInfo,
      connections,
      deleteMessage,
      fetchMoreMessages,
      filesUpload,
      foundConnections,
      foundUsers,
      hasMoreMessages,
      isFetchingMoreMessages,
      isLoadingMessages,
      isLoadingMessagesError,
      markMessageAsRead,
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

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useMessengerContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Messenger context not found');
  }

  return context;
}
