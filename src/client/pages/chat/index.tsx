import { Fragment } from 'react';

import { useDialog } from '#/client/entities/dialog';
import { MessagesContext, useMessagesContext } from '#/client/entities/message';
import { MessageInput } from '#/client/features/message-input';
import { ChannelsListAndSearch } from '#/client/widgets/channels-list-and-search';
import { Layout } from '#/client/widgets/layouts';
import { MessagesArea } from '#/client/widgets/messages-area';
import { MessageAreaHeader } from '#/client/widgets/messages-area-header';
import { isExistingDialog } from '#/domain/dialog';

const ChatPage = () => {
  const dialog = useDialog();
  const { messages, isLoadingMessages, isErrorWhileLoadingMessages } = useMessagesContext();

  return (
    <MessagesContext
      dialogId={dialog.current && isExistingDialog(dialog.current) ? dialog.current.id : undefined}>
      <Layout.Chat
        sidebar={<ChannelsListAndSearch />}
        content={
          <Fragment>
            {dialog.current && (
              <MessageAreaHeader
                title={dialog.current.user.login}
                isOnline={false}
                // TODO add isOnline
                // isOnline={currentDialog.partner.isOnline}
              />
            )}
            <MessagesArea
              messages={messages}
              dialog={dialog.current}
              isError={isErrorWhileLoadingMessages}
              isLoading={isLoadingMessages}
            />
            {dialog && <MessageInput />}
          </Fragment>
        }
      />
    </MessagesContext>
  );
};

export default ChatPage;
