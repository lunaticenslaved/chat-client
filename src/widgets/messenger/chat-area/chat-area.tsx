import { Fragment } from "react";

import { useMessages } from "features/messenger/api/use-messages";
import { DialogHeader } from "features/messenger/components/dialog-header";
import { MessageInput } from "features/messenger/components/message-input";
import { MessagesArea } from "features/messenger/components/messages-area";

export const ChatArea = () => {
  const {
    isError: isErrorMessages,
    isLoading: isLoadingMessages,
    messages,
    currentDialog,
  } = useMessages();

  return (
    <Fragment>
      {currentDialog && (
        <DialogHeader title={currentDialog.user.name} isOnline={currentDialog.user.isOnline} />
      )}
      <MessagesArea
        messages={messages || []}
        currentDialog={currentDialog || undefined}
        isError={isErrorMessages}
        isLoading={isLoadingMessages}
      />
      {currentDialog && <MessageInput />}
    </Fragment>
  );
};
