import { Fragment } from 'react';

import { useDialogs } from '@/entities/dialog';
import { useMessages } from '@/entities/message';
import { MessageInput } from '@/features/message-input';
import { Layout } from '@/widgets/layouts';
import { MessagesArea } from '@/widgets/messages-area';
import { MessageAreaHeader } from '@/widgets/messages-area-header';
import { SearchableDialogs } from '@/widgets/searchable-dialogs';

const ChatPage = () => {
  const { currentDialog } = useDialogs({ searchQuery: '' });
  const { messages, isError: isErrorMessages, isFetching: isLoadingMessages } = useMessages();

  return (
    <Layout.Chat
      sidebar={<SearchableDialogs />}
      content={
        <Fragment>
          {currentDialog && (
            <MessageAreaHeader
              title={currentDialog.partner.login}
              isOnline={false}
              // TODO add isOnline
              // isOnline={currentDialog.partner.isOnline}
            />
          )}
          <MessagesArea
            messages={messages || []}
            currentDialog={currentDialog || undefined}
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
