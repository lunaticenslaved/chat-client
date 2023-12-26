import { useMessengerContext } from '../../context';

import { MessagesList } from './views/messages-list';
import { ErrorView, LoadingMessagesView, NoDialogView, NoMessagesView } from './views/placeholders';

export const MessagesArea = () => {
  const { messages, isLoadingMessages, isLoadingMessagesError, selectedItem } =
    useMessengerContext();

  if (!selectedItem) {
    return <NoDialogView />;
  }

  if (isLoadingMessages) {
    return <LoadingMessagesView />;
  }

  if (!messages.length) {
    return <NoMessagesView />;
  }

  if (isLoadingMessagesError) {
    return <ErrorView />;
  }

  return <MessagesList />;
};
