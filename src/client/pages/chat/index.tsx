import { Fragment } from 'react';

import { useCurrentDialog } from '@/entities/dialog';
import { useMessages } from '@/entities/message';
import { MessageInput } from '@/features/message-input';
import { ChannelsListAndSearch } from '@/widgets/channels-list-and-search';
import { Layout } from '@/widgets/layouts';
import { MessagesArea } from '@/widgets/messages-area';
import { MessageAreaHeader } from '@/widgets/messages-area-header';

const ChatPage = () => {
  const currentDialog = useCurrentDialog();
  const { messages, isError: isErrorMessages, isFetching: isLoadingMessages } = useMessages();

  return (
    <Layout.Chat
      sidebar={<ChannelsListAndSearch />}
      content={
        <Fragment>
          {currentDialog.current && (
            <MessageAreaHeader
              title={currentDialog.current.partner.login}
              isOnline={false}
              // TODO add isOnline
              // isOnline={currentDialog.partner.isOnline}
            />
          )}
          <MessagesArea
            messages={messages || []}
            currentDialog={currentDialog.current}
            isError={isErrorMessages}
            isLoading={isLoadingMessages}
          />
          {currentDialog && <MessageInput />}
        </Fragment>
      }
    />
  );
};

export default ChatPage;
