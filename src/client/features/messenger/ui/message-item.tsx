import { MessageListItem, MessageMenu } from '#/client/entities/message';
import { useViewer } from '#/client/entities/viewer';
import { Message, canDeleteMessage } from '#/domain/message';

import { MessageItemInfo } from './common';

interface MessageItemProps {
  message: Message;
  onDelete(): void;
}

export function MessageItem({ message, onDelete }: MessageItemProps) {
  const { user: viewer } = useViewer();

  if (!viewer) {
    throw new Error('Unknown viewer');
  }

  return (
    <MessageItemInfo message={message}>
      {({ avatar, ownerName, isMe, isMyMessageRead }) => (
        <MessageMenu
          key={message.id}
          message={message}
          deleteMessage={
            viewer && canDeleteMessage({ viewerId: viewer.id, authorId: message.authorId })
              ? onDelete
              : undefined
          }
          placement={isMe ? 'right' : 'left'}>
          <MessageListItem
            {...message}
            avatar={avatar}
            ownerName={ownerName}
            isMe={isMe}
            isRead={isMe && isMyMessageRead}
          />
        </MessageMenu>
      )}
    </MessageItemInfo>
  );
}
