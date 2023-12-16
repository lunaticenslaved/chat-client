import { DialogsList } from '#/client/entities/dialog';
import { Divider } from '#/client/shared/components/divider';

import { useConnections } from '../../hooks/connections';
import { useMessages } from '../../hooks/messages';
import { useSearch } from '../../hooks/search';
import { MessageInput } from '../message-input';
import { MessagesArea } from '../messages-area';
import { MessageAreaHeader } from '../messages-area-header/messages-area-header';
import { SearchInput } from '../search-input/search';
import { SearchResults } from '../search-results/search-results';

import classes from './messenger.module.scss';

export const Messenger = () => {
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
      <aside className={classes.sidebar}>
        <SearchInput search={searchQuery || ''} onChange={setSearchQuery} />

        <Divider />

        <div style={{ overflowY: 'auto' }}>
          {!searchQuery ? (
            <DialogsList dialogs={connections} onClick={setCurrentConnection} />
          ) : (
            <SearchResults
              connections={foundConnections}
              users={foundUsers}
              onUserClick={setSelectedUser}
              onConnectionClick={setCurrentConnection}
            />
          )}
        </div>
      </aside>

      <Divider vertical />

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
