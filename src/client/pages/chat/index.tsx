import { Fragment } from 'react';

import { useDialog } from '#/client/entities/dialog';
import { useMessages } from '#/client/entities/message';
import { MessageInput } from '#/client/features/message-input';
import { ChannelsListAndSearch } from '#/client/widgets/channels-list-and-search';
import { Layout } from '#/client/widgets/layouts';
import { MessagesArea } from '#/client/widgets/messages-area';
import { MessageAreaHeader } from '#/client/widgets/messages-area-header';

const ChatPage = () => {
  const dialog = useDialog();
  const { messages, isError: isErrorMessages, isFetching: isLoadingMessages } = useMessages();

  return (
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
            messages={messages || []}
            dialog={dialog.current}
            isError={isErrorMessages}
            isLoading={isLoadingMessages}
          />
          {dialog && <MessageInput />}
        </Fragment>
      }
    />
  );
};

export default ChatPage;
