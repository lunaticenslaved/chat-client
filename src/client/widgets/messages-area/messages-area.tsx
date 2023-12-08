import { Dialog } from '@domain/dialog';

import { MessageModel } from '@/entities/message';

import { HasErrorView } from './views/has-error/has-error';
import { LoadingMessagesView } from './views/loading-messages';
import { MessagesList } from './views/messages-list';
import { NoDialogView } from './views/no-dialog';
import { NoMessagesView } from './views/no-messages';

export interface MessageAreaProps {
  messages: MessageModel[];
  dialog?: Dialog;
  isLoading: boolean;
  isError: boolean;
}

export const MessagesArea = ({ messages, dialog, isError, isLoading }: MessageAreaProps) => {
  if (!dialog) {
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
