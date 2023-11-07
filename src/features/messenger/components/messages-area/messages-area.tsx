import { MessagesList } from "./views/messages-list";
import { LoadingMessagesView } from "./views/loading-messages";
import { NoMessagesView } from "./views/no-messages";
import { NoDialogView } from "./views/no-dialog";
import { MessageModel } from "@/entities/message";
import { DialogModel } from "@/entities/dialog";
import { HasErrorView } from "./views/has-error/has-error";

export interface MessageAreaProps {
  messages: MessageModel[];
  currentDialog?: DialogModel;
  isLoading: boolean;
  isError: boolean;
}

export const MessagesArea = ({ messages, currentDialog, isError, isLoading }: MessageAreaProps) => {
  if (!currentDialog) {
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
