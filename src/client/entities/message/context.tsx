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
import { Connection } from '#/domain/connection';
import { Message } from '#/domain/message';
import { User } from '#/domain/user';

// TODO: should I unite message and dialog context as messenger context in features/messenger?

type SelectedItem =
  | {
      type: 'dialog';
      dialog: Connection;
    }
  | {
      type: 'user';
      user: User;
    };

export interface IMessagesContext {
  messages: Message[];
  isLoadingMessages: boolean;
  isErrorWhileLoadingMessages: boolean;

  sendMessage(text: string): boolean;
}

export type MessagesContextProps = {
  selectedItem?: SelectedItem;
  children?: ReactNode | ((value: IMessagesContext) => ReactNode | JSX.Element);
};

const Context = createContext<IMessagesContext | undefined>(undefined);

function Provider({ children, selectedItem }: MessagesContextProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const loadingMessagesToggle = useToggle();
  const errorMessagesToggle = useToggle();
  const viewer = useViewer();
  const connectionId = selectedItem?.type === 'dialog' ? selectedItem.dialog?.id : undefined;

  const { socket } = useSocketContext();
  const messagesEmitter = useMemo(() => new MessageEventsEmitter(socket), [socket]);
  const messagesListener = useMemo(() => new MessageEventsListener(socket), [socket]);

  const sendMessage = useCallback(
    (text: string) => {
      const userId = viewer.user?.id;

      if (!userId) return false;
      if (!selectedItem) return false;

      if (selectedItem.type === 'dialog') {
        messagesEmitter.sendMessage({
          text,
          connectionId: selectedItem.dialog.id,
        });
      } else if (selectedItem.type === 'user') {
        messagesEmitter.sendMessage({
          text,
          userId: selectedItem.user.id,
        });
      }

      return true;
    },
    [viewer.user?.id, selectedItem, messagesEmitter],
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
    if (!connectionId) return;

    console.log('LIST MESSAGES');

    loadingMessagesToggle.setTrue();
    errorMessagesToggle.setFalse();

    api.actions.message
      .list({
        data: { connectionId, take: 20 },
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
  }, [connectionId]);

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
