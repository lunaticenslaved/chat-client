import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { MessageEventsEmitter, MessageEventsListener } from '#/api/message';
import { useViewer } from '#/client/entities/viewer';
import { api } from '#/client/shared/api';
import { useToggle } from '#/client/shared/hooks';
import { useSocketContext } from '#/client/shared/socket-context';
import { Dialog, isExistingDialog } from '#/domain/dialog';
import { Message } from '#/domain/message';

export interface IMessagesContext {
  messages: Message[];
  isLoadingMessages: boolean;
  isErrorWhileLoadingMessages: boolean;

  sendMessage(text: string): boolean;
}

export type MessagesContextProps = {
  currentDialog?: Dialog;
  children?: ReactNode | ((value: IMessagesContext) => ReactNode | JSX.Element);
};

const Context = createContext<IMessagesContext | undefined>(undefined);

function Provider({ children, currentDialog }: MessagesContextProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const loadingMessagesToggle = useToggle();
  const errorMessagesToggle = useToggle();
  const viewer = useViewer();
  const dialogId = currentDialog && isExistingDialog(currentDialog) ? currentDialog.id : undefined;

  const { socket } = useSocketContext();
  const messagesEmitter = useMemo(() => new MessageEventsEmitter(socket), [socket]);
  const messagesListener = useMemo(() => new MessageEventsListener(socket), [socket]);

  const sendMessage = useCallback(
    (text: string) => {
      const userId = viewer.user?.id;

      if (!currentDialog || !userId) return false;

      if (isExistingDialog(currentDialog)) {
        messagesEmitter.sendMessage({
          text,
          type: 'old_dialog',
          dialogId: currentDialog.id,
          viewerId: userId,
        });
      } else {
        messagesEmitter.sendMessage({
          text,
          type: 'new_dialog',
          userId: currentDialog.user.id,
          viewerId: userId,
        });
      }

      return true;
    },
    [viewer.user?.id, currentDialog, messagesEmitter],
  );

  const value: IMessagesContext = useMemo(
    () => ({
      messages,
      isLoadingMessages: false,
      isErrorWhileLoadingMessages: false,

      sendMessage,
    }),
    [messages, sendMessage],
  );

  useEffect(() => {
    messagesListener.messageCreated(data => {
      console.log('MESSAGE RECEIVED', data);

      setMessages(arr => [...arr, data]);
    });
  }, [messagesListener]);

  useEffect(() => {
    if (!dialogId) return;

    console.log('LIST MESSAGES');

    loadingMessagesToggle.setTrue();
    errorMessagesToggle.setFalse();

    api.actions.message
      .list({
        data: { dialogId, take: 20 },
      })
      .then(({ messages }) => {
        setMessages(messages);
      })
      .catch(() => {
        errorMessagesToggle.setTrue();
      })
      .finally(() => {
        loadingMessagesToggle.setFalse();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogId]);

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  );
}

export function MessagesContext(props: MessagesContextProps) {
  const existingContext = useContext(Context);

  if (existingContext) {
    const { children } = props;

    return typeof children === 'function' ? children(existingContext) : children;
  }

  return <Provider {...props} />;
}

export function useMessagesContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('No messages context!');
  }

  return context;
}
