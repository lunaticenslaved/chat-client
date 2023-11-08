import { Fragment } from "react";

import { ChatLayout } from "@/pages/_layouts/chat-layout";
import { SearchableDialogs } from "@/widgets/searchable-dialogs";
import { MessageAreaHeader } from "@/widgets/messages-area-header";
import { MessagesArea } from "@/widgets/messages-area";
import { MessageInput } from "@/features/message-input";
import { useDialogs } from "@/entities/dialog";
import { useMessages } from "@/entities/message";

const ChatPage = () => {
  const { currentDialog } = useDialogs({ searchQuery: "" });
  const { messages, isError: isErrorMessages, isFetching: isLoadingMessages } = useMessages();

  return (
    <ChatLayout
      sidebar={<SearchableDialogs />}
      content={
        <Fragment>
          {currentDialog && (
            <MessageAreaHeader
              title={currentDialog.user.name}
              isOnline={currentDialog.user.isOnline}
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
