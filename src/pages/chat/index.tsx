import { ChatLayout } from "@/pages/_layouts/chat-layout";
import { ChatArea } from "@/widgets/messenger/chat-area";
import { SearchableDialogs } from "@/widgets/searchable-dialogs";

const ChatPage = () => {
  return <ChatLayout content={<ChatArea />} sidebar={<SearchableDialogs />} />;
};

export default ChatPage;
