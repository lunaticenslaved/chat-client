import { Fragment } from 'react';

import { DialogsContext } from '#/client/entities/dialog';
import { MessageInput, MessagesContext } from '#/client/entities/message';
import { SearchContext } from '#/client/features/search/in-channels';
import { Layout } from '#/client/widgets/layouts';
import { MessagesArea } from '#/client/widgets/messages-area';
import { MessageAreaHeader } from '#/client/widgets/messages-area-header';
import { ConnectionType } from '#/domain/connection';

const ChatPage = () => {
  return (
    <SearchContext>
      {({ query, setQuery }) => {
        return (
          <DialogsContext>
            {({ selectedItem, dialogs, setSelectedDialog, setSelectedUser }) => {
              return (
                <MessagesContext selectedItem={selectedItem}>
                  {({
                    messages,
                    isLoadingMessages,
                    isErrorWhileLoadingMessages,
                    sendMessage,
                    fetchMoreMessages,
                    hasMoreMessages,
                  }) => {
                    return (
                      <Layout.Chat
                        query={query}
                        setQuery={setQuery}
                        dialogs={dialogs}
                        onUserClick={setSelectedUser}
                        onDialogClick={setSelectedDialog}
                        messageArea={
                          <Fragment>
                            {selectedItem?.type === 'dialog' &&
                              selectedItem.dialog.type === ConnectionType.OneToOne && (
                                <MessageAreaHeader
                                  title={selectedItem.dialog.user.login}
                                  isOnline={false}
                                  // TODO add isOnline
                                  // isOnline={currentDialog.partner.isOnline}
                                />
                              )}
                            {selectedItem?.type === 'user' && (
                              <MessageAreaHeader
                                title={selectedItem.user.login}
                                isOnline={false}
                                // TODO add isOnline
                                // isOnline={currentDialog.partner.isOnline}
                              />
                            )}
                            <MessagesArea
                              messages={messages}
                              noDialog={!selectedItem}
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
                  }}
                </MessagesContext>
              );
            }}
          </DialogsContext>
        );
      }}
    </SearchContext>
  );
};

export default ChatPage;
