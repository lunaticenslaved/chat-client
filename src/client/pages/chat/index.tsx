import { Fragment } from 'react';

import { DialogsContext } from '#/client/entities/dialog';
import { MessageInput, MessagesContext } from '#/client/entities/message';
import { ChannelsListAndSearch } from '#/client/widgets/channels-list-and-search';
import { Layout } from '#/client/widgets/layouts';
import { MessagesArea } from '#/client/widgets/messages-area';
import { MessageAreaHeader } from '#/client/widgets/messages-area-header';

const ChatPage = () => {
  return (
    <DialogsContext>
      {({ currentDialog }) => {
        return (
          <MessagesContext currentDialog={currentDialog}>
            {({ messages, isLoadingMessages, isErrorWhileLoadingMessages, sendMessage }) => {
              return (
                <Layout.Chat
                  sidebar={<ChannelsListAndSearch />}
                  content={
                    <Fragment>
                      {currentDialog && (
                        <MessageAreaHeader
                          title={currentDialog.user.login}
                          isOnline={false}
                          // TODO add isOnline
                          // isOnline={currentDialog.partner.isOnline}
                        />
                      )}
                      <MessagesArea
                        messages={messages}
                        dialog={currentDialog}
                        isError={isErrorWhileLoadingMessages}
                        isLoading={isLoadingMessages}
                      />
                      {currentDialog && <MessageInput onSubmit={sendMessage} />}
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
};

export default ChatPage;
