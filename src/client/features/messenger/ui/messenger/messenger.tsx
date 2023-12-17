import { useConnections } from '../../hooks/connections';
import { useMessages } from '../../hooks/messages';
import { useSearch } from '../../hooks/search';
import { MessageInput } from '../message-input';
import { MessagesArea } from '../messages-area';
import { MessageAreaHeader } from '../messages-area-header/messages-area-header';
import { MessengerSidebar } from '../sidebar';

import classes from './messenger.module.scss';

export const Messenger = () => {
  // FIXME not it search on mount
  const {
    selectedUser,
    setSelectedUser,
    searchQuery,
    setSearchQuery,
    foundConnections,
    foundUsers,
  } = useSearch({
    fetch: true,
  });
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
    <div className={classes.main}>
      <MessengerSidebar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        connections={connections}
        onConnectionClick={setCurrentConnection}
        onUserClick={setSelectedUser}
        foundConnections={foundConnections}
        foundUsers={foundUsers}
        currentConnection={currentConnection}
      />

      <div className={classes.content}>
        <>
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
        </>
      </div>
    </div>
  );
};
