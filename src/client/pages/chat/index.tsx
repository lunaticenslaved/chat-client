import { Fragment } from 'react';

import { MessageInput } from '#/client/entities/message';
import {
  MessageAreaHeader,
  useConnections,
  useMessages,
  useSearch,
} from '#/client/features/messenger';
import { Layout } from '#/client/widgets/layouts';
import { MessagesArea } from '#/client/widgets/messages-area';

const ChatPage = () => {
  const { selectedUser, setSelectedUser, searchQuery, setSearchQuery } = useSearch();
  const { connections, setCurrentConnection, currentConnection } = useConnections();
  const {
    messages,
    isLoading: isLoadingMessages,
    isLoadingError: isErrorWhileLoadingMessages,
    fetchMoreMessages,
    hasMoreMessages,
    sendMessage,
  } = useMessages({ currentConnectionId: currentConnection?.id });

  const selectedItem = selectedUser || currentConnection;

  return (
    <Layout.Chat
      query={searchQuery || ''}
      setQuery={setSearchQuery}
      dialogs={connections}
      onUserClick={setSelectedUser}
      onDialogClick={setCurrentConnection}
      messageArea={
        <Fragment>
          {!!selectedItem && (
            <MessageAreaHeader
              selectedItem={selectedItem}
              isOnline={false}
              // TODO add isOnline
              // isOnline={currentDialog.partner.isOnline}
            />
          )}
          <MessagesArea
            messages={messages}
            noDialog={!currentConnection && !selectedUser}
            isError={isErrorWhileLoadingMessages}
            isLoading={isLoadingMessages}
            hasMore={hasMoreMessages}
            onFetchMore={fetchMoreMessages}
          />
          {selectedItem && <MessageInput onSubmit={sendMessage} />}
        </Fragment>
      }
    />
  );
};

export default ChatPage;
