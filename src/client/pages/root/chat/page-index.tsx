import {
  ConnectionInfo,
  MessageAreaHeader,
  MessageInput,
  MessagesArea,
  MessengerSidebar,
  useMessengerContext,
} from '#/client/features/messenger';
import { Flex } from '#/client/shared/components/flex';

const ChatPage = () => {
  const { selectedItem, connectionInfo, filesUpload } = useMessengerContext();
  const { setDragging, cancelDragging } = filesUpload;

  return (
    <Flex
      fill
      flex="1 1 auto"
      wrap="nowrap"
      onDrag={setDragging}
      onDragOver={setDragging}
      onDragEnter={setDragging}
      onDrop={cancelDragging}
      onDragLeave={cancelDragging}
      onDragEnd={cancelDragging}
      onDragExit={cancelDragging}>
      <MessengerSidebar />

      <Flex direction="column" style={{ overflowY: 'auto', position: 'relative' }} flex="1 1 auto">
        {!!selectedItem && <MessageAreaHeader selectedItem={selectedItem} />}
        <MessagesArea />
        <Flex style={{ padding: '20px' }} alignItems="center">
          {!!selectedItem && <MessageInput />}
        </Flex>
      </Flex>

      {connectionInfo.isOpen && <ConnectionInfo />}
    </Flex>
  );
};

export default ChatPage;
