import { useEffect, useLayoutEffect, useMemo } from 'react';

import { ConnectionEventsListener } from '#/api/connection';
import { MessageEventsListener } from '#/api/message';
import { api } from '#/client/shared/api';
import { useToggle } from '#/client/shared/hooks';
import { socket } from '#/client/shared/socket-context';
import { Connection } from '#/domain/connection';
import { Message } from '#/domain/message';
import { store, useAppDispatch, useAppSelector } from '#/store';

export interface UseConnections {
  connections: Connection[];

  isLoading: boolean;
  isLoadingError: boolean;

  currentConnection?: Connection;
  setCurrentConnection(value?: Connection): void;
}

const connectionsListener = new ConnectionEventsListener(socket);
const messagesListener = new MessageEventsListener(socket);

export function useConnections(): UseConnections {
  const currentConnection = useAppSelector(store.dialogs.selectors.selectCurrentDialog);
  const connections = useAppSelector(store.dialogs.selectors.selectDialogs);
  const isLoading = useToggle();
  const isLoadingError = useToggle();

  const dispatch = useAppDispatch();

  const { addConnection, setConnections, setCurrentConnection, updateLastMessage } = useMemo(
    () => ({
      addConnection: (value: Connection) => {
        dispatch(store.dialogs.actions.addConnection(value));
      },
      updateLastMessage: (value: Message) => {
        dispatch(store.dialogs.actions.updateLastMessage(value));
      },
      setConnections: (value: Connection[]) => {
        dispatch(store.dialogs.actions.setDialogs(value));
      },
      setCurrentConnection: (value?: Connection) => {
        dispatch(store.dialogs.actions.setCurrentDialog(value));
      },
    }),
    [dispatch],
  );

  useEffect(() => {
    // FIXME handle disconnect
    messagesListener.messageCreated(data => updateLastMessage(data));
  }, [updateLastMessage]);

  useEffect(() => {
    // FIXME handle error
    connectionsListener.connectionCreated(data => addConnection(data));
  }, [addConnection]);

  // List connections on mount
  useLayoutEffect(() => {
    isLoading.setTrue();
    isLoadingError.setFalse();

    api.actions.dialog
      .list({ data: undefined })
      .then(data => setConnections(data.connections))
      .catch(() => isLoadingError.setTrue())
      .finally(() => isLoading.setFalse());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading: isLoading.isTrue,
    isLoadingError: isLoadingError.isTrue,

    connections,
    currentConnection,
    setCurrentConnection,
  };
}
