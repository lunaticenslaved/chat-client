import { Fragment } from 'react';

import { DialogsContext } from '#/client/entities/dialog';
import { MessagesContext } from '#/client/entities/message';
import { MessageInput } from '#/client/features/message-input';
import { ChannelsListAndSearch } from '#/client/widgets/channels-list-and-search';
import { Layout } from '#/client/widgets/layouts';
import { MessagesArea } from '#/client/widgets/messages-area';
import { MessageAreaHeader } from '#/client/widgets/messages-area-header';
import { isExistingDialog } from '#/domain/dialog';

const ChatPage = () => {
  return (
    <DialogsContext>
      {({ currentDialog }) => {
        return (
          <MessagesContext
            dialogId={
              currentDialog && isExistingDialog(currentDialog) ? currentDialog.id : undefined
            }>
            {({ messages, isLoadingMessages, isErrorWhileLoadingMessages }) => {
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
                      {currentDialog && <MessageInput />}
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
