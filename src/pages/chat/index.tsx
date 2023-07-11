import { Chat } from "widgets/messenger/chat";
import { Sidebar } from "widgets/messenger/sidebar";
import { ChatLayout } from "pages/_layouts/chat-layout";

const ChatPage = () => {
  return <ChatLayout chat={<Chat />} sidebar={<Sidebar />} />;
};

export default ChatPage;
