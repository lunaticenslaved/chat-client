import { Flex } from 'antd';

import {
  ConnectionInfo,
  MessageAreaHeader,
  MessageInput,
  MessagesArea,
  MessengerSidebar,
  useMessengerContext,
} from '#/client/features/messenger';

const ChatPage = () => {
  const { selectedItem, connectionInfo } = useMessengerContext();

  return (
    <Flex style={{ height: '100%', width: '100%' }} flex="1 1 auto" wrap="nowrap">
      <MessengerSidebar />

      <Flex vertical style={{ overflowY: 'auto' }} flex="1 1 auto">
        {!!selectedItem && <MessageAreaHeader selectedItem={selectedItem} />}
        <MessagesArea />
        {!!selectedItem && <MessageInput />}
      </Flex>

      {connectionInfo.isOpen && <ConnectionInfo />}
    </Flex>
  );
};

export default ChatPage;
