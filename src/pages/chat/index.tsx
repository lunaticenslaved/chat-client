import { ChatLayout } from "@/pages/_layouts/chat-layout";
import { ChatArea } from "@/widgets/messenger/chat-area";
import { Dialogs } from "@/widgets/messenger/dialogs";

const ChatPage = () => {
  return <ChatLayout content={<ChatArea />} sidebar={<Dialogs />} />;
};

export default ChatPage;
