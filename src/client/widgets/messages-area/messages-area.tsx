import { MessagesList } from '#/client/entities/message';
import { Message } from '#/domain/message';

import { HasErrorView } from './views/has-error/has-error';
import { LoadingMessagesView } from './views/loading-messages';
import { NoDialogView } from './views/no-dialog';
import { NoMessagesView } from './views/no-messages';

export interface MessageAreaProps {
  messages: Message[];
  noDialog: boolean;
  isLoading: boolean;
  isError: boolean;
}

export const MessagesArea = ({ messages, noDialog, isError, isLoading }: MessageAreaProps) => {
  if (noDialog) {
    return <NoDialogView />;
  }

  if (isLoading) {
    return <LoadingMessagesView />;
  }

  if (!messages.length) {
    return <NoMessagesView />;
  }

  if (isError) {
    return <HasErrorView />;
  }

  return <MessagesList messages={messages} />;
};
