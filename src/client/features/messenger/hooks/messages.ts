import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';

import { MessageEventsEmitter, MessageEventsListener, messagesActions } from '#/api/message';
import { useViewer } from '#/client/entities/viewer';
import { useToggle } from '#/client/shared/hooks';
import { socket } from '#/client/shared/socket-context';
import { Message } from '#/domain/message';
import { store, useAppDispatch, useAppSelector } from '#/store';

export type UseMessagesProps = {
  selectedUserId?: string;
  currentConnectionId?: string;
};

export interface UseMessages {
  messages: Message[];
  isLoading: boolean;
  isLoadingError: boolean;
  hasMoreMessages: boolean;
  fetchMoreMessages(): void;
  sendMessage(text: string): boolean;
}

const AMOUNT = 20;

const messagesListener = new MessageEventsListener(socket);
const messagesEmitter = new MessageEventsEmitter(socket);

export function useMessages({
  currentConnectionId,
  selectedUserId,
}: UseMessagesProps): UseMessages {
  const viewer = useViewer();
  const messages = useAppSelector(store.messages.selectors.selectMessages);
  const dispatch = useAppDispatch();
  const isLoading = useToggle();
  const isLoadingError = useToggle();
  const hasMoreMessages = useToggle();
  const isFetchingMore = useToggle();
  const isFetchingMoreError = useToggle();

  const { setMessages, addMessage, prependMessages } = useMemo(
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
    }),
    [dispatch],
  );

  const fetchMoreMessages = useCallback(() => {
    if (isLoading.isTrue) return;
    if (isFetchingMore.isTrue) return;
    if (hasMoreMessages.isFalse) return;
    if (!currentConnectionId) return;

    isFetchingMore.setTrue();
    isFetchingMoreError.setFalse();

    messagesActions
      .list({
        data: {
          connectionId: currentConnectionId,
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
    currentConnectionId,
    hasMoreMessages,
    isFetchingMore,
    isFetchingMoreError,
    isLoading.isTrue,
    messages,
    prependMessages,
  ]);

  const sendMessage = useCallback(
    (text: string) => {
      const userId = viewer.user?.id;

      if (!userId) return false;

      if (selectedUserId) {
        messagesEmitter.sendMessage({ text, userId: selectedUserId });
      } else if (currentConnectionId) {
        messagesEmitter.sendMessage({ text, connectionId: currentConnectionId });
      }

      return true;
    },
    [viewer.user?.id, selectedUserId, currentConnectionId],
  );

  useEffect(() => {
    // FIXME handle error
    // FIXME handle unsubscribe
    messagesListener.messageCreated(data => addMessage(data));
  }, [addMessage]);

  // List messages for the new connection
  useLayoutEffect(() => {
    if (!currentConnectionId) return;

    isLoading.setTrue();
    isLoadingError.setFalse();

    messagesActions
      .list({ data: { connectionId: currentConnectionId, take: AMOUNT } })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConnectionId]);

  return {
    sendMessage,
    messages,
    fetchMoreMessages,
    isLoading: isLoading.value,
    isLoadingError: isLoadingError.value,
    hasMoreMessages: hasMoreMessages.value,
  };
}
