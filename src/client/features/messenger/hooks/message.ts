import { useCallback } from 'react';

import { MessageEventsEmitter } from '#/api/message';
import { useViewer } from '#/client/entities/viewer';
import { socket } from '#/client/shared/socket-context';
import { Message, canDeleteMessage } from '#/domain/message';
import { notReachable } from '#/shared/utils';

import { SelectedItem } from '../types';

export type IMessage = {
  sendMessage(text: string): boolean;
  deleteMessage(message: Message): void;
};

type UseMessageProps = {
  selectedItem?: SelectedItem;
};

const messagesEmitter = new MessageEventsEmitter(socket);

export function useMessage({ selectedItem }: UseMessageProps): IMessage {
  const { user: viewer } = useViewer();

  const sendMessage = useCallback(
    (text: string) => {
      if (!selectedItem) return false;

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

      return true;
    },
    [selectedItem],
  );

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
  };
}
