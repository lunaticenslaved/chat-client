import { useCallback } from 'react';

import { MessageEventsEmitter } from '#/api/message';
import { useViewer } from '#/client/entities/viewer';
import { socket } from '#/client/shared/socket-context';
import { Message, canDeleteMessage } from '#/domain/message';
import { notReachable } from '#/shared/utils';

import { eventBus } from '../event-bus';
import { SelectedItem } from '../types';

export type IMessage = {
  sendMessage(text: string): boolean;
  deleteMessage(message: Message): void;
  markMessageAsRead(messageId: string): void;
};

type UseMessageProps = {
  selectedItem?: SelectedItem;
};

const messagesEmitter = new MessageEventsEmitter(socket);

export function useMessage({ selectedItem }: UseMessageProps): IMessage {
  const { user: viewer } = useViewer();

  const sendMessage = useCallback(
    (text: string) => {
      const userId = viewer?.id;

      if (!selectedItem) return false;
      if (!userId) return false;

      switch (selectedItem.type) {
        case 'user':
          messagesEmitter.sendMessage({ text, userId: selectedItem.user.id });
          break;
        case 'connection':
          messagesEmitter.sendMessage({ text, connectionId: selectedItem.connection.id });
          break;
        default:
          notReachable(selectedItem);
      }

      eventBus.emit('sent', undefined);

      return true;
    },
    [viewer?.id, selectedItem],
  );

  const markMessageAsRead = useCallback((messageId: string) => {
    messagesEmitter.readMessage({ messageId });
  }, []);

  const deleteMessage = useCallback(
    (message: Message) => {
      if (!viewer) return false;

      if (canDeleteMessage({ viewerId: viewer.id, authorId: message.authorId })) {
        messagesEmitter.deleteMessage({ messageId: message.id });
      }
    },
    [viewer],
  );

  return {
    sendMessage,
    deleteMessage,
    markMessageAsRead,
  };
}
