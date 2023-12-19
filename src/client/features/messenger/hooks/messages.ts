import { useCallback, useLayoutEffect, useMemo } from 'react';

import { DeleteMessageResponse, MessageEventsEmitter, messagesActions } from '#/api/message';
import { useViewer } from '#/client/entities/viewer';
import { useToggle } from '#/client/shared/hooks';
import { socket } from '#/client/shared/socket-context';
import { Message } from '#/domain/message';
import { notReachable } from '#/shared/utils';
import { store, useAppDispatch, useAppSelector } from '#/store';

import { SelectedItem } from '../types';

export type UseMessagesProps = {
  selectedItem?: SelectedItem;
};

export interface UseMessages {
  messages: Message[];
  isLoading: boolean;
  isLoadingError: boolean;
  hasMoreMessages: boolean;
  fetchMoreMessages(): void;
  sendMessage(text: string): boolean;
  addMessage(message: Message): void;
  removeMessageFromList(data: DeleteMessageResponse): void;
}

const AMOUNT = 20;

const messagesEmitter = new MessageEventsEmitter(socket);

export function useMessages({ selectedItem }: UseMessagesProps): UseMessages {
  const viewer = useViewer();
  const messages = useAppSelector(store.messages.selectors.selectMessages);
  const dispatch = useAppDispatch();
  const isLoading = useToggle();
  const isLoadingError = useToggle();
  const hasMoreMessages = useToggle();
  const isFetchingMore = useToggle();
  const isFetchingMoreError = useToggle();

  const { setMessages, addMessage, prependMessages, removeMessage } = useMemo(
    () => ({
      setMessages(messages: Message[]) {
        dispatch(store.messages.actions.setMessages(messages));
      },
      prependMessages(messages: Message[]) {
        dispatch(store.messages.actions.prependMessages(messages));
      },
      addMessage(message: Message) {
        dispatch(store.messages.actions.addMessage(message));
      },
      removeMessage(messageId: string) {
        dispatch(store.messages.actions.removeMessage({ messageId }));
      },
    }),
    [dispatch],
  );

  const fetchMoreMessages = useCallback(() => {
    if (isLoading.isTrue) return;
    if (isFetchingMore.isTrue) return;
    if (hasMoreMessages.isFalse) return;

    if (!selectedItem) {
      setMessages([]);
      return;
    }

    if (selectedItem.type === 'user') {
      setMessages([]);
      return;
    }

    isFetchingMore.setTrue();
    isFetchingMoreError.setFalse();

    messagesActions
      .list({
        data: {
          connectionId: selectedItem.connection.id,
          take: AMOUNT,
          prevLoadedMessageId: messages[0].id,
        },
      })
      .then(({ messages }) => {
        if (messages.length < AMOUNT) {
          hasMoreMessages.setFalse();
        }

        if (messages.length) {
          prependMessages(messages);
        }
      })
      .catch(() => {
        // TODO show error
        isFetchingMoreError.setFalse();
      })
      .finally(() => {
        isFetchingMore.setFalse();
      });
  }, [
    hasMoreMessages,
    isFetchingMore,
    isFetchingMoreError,
    isLoading.isTrue,
    messages,
    prependMessages,
    selectedItem,
    setMessages,
  ]);

  const sendMessage = useCallback(
    (text: string) => {
      const userId = viewer.user?.id;

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

      return true;
    },
    [viewer.user?.id, selectedItem],
  );

  const removeMessageFromList = useCallback(
    (data: DeleteMessageResponse) => {
      if (!selectedItem) return;
      if (selectedItem.type !== 'connection') return;
      if (selectedItem.connection.id !== data.connectionId) return;

      removeMessage(data.messageId);
    },
    [removeMessage, selectedItem],
  );

  // List messages for the new connection
  useLayoutEffect(() => {
    if (!selectedItem) {
      setMessages([]);
    } else if (selectedItem.type === 'user') {
      setMessages([]);
    } else if (selectedItem.type === 'connection') {
      isLoading.setTrue();
      isLoadingError.setFalse();

      messagesActions
        .list({ data: { connectionId: selectedItem.connection.id, take: AMOUNT } })
        .then(({ messages }) => {
          setMessages(messages);

          if (messages.length === AMOUNT) {
            hasMoreMessages.setTrue();
          } else {
            hasMoreMessages.setFalse();
          }
        })
        .catch(() => isLoadingError.setTrue())
        .finally(() => isLoading.setFalse());
    } else {
      notReachable(selectedItem);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  return {
    sendMessage,
    messages,
    fetchMoreMessages,
    addMessage,
    removeMessageFromList,
    isLoading: isLoading.value,
    isLoadingError: isLoadingError.value,
    hasMoreMessages: hasMoreMessages.value,
  };
}
