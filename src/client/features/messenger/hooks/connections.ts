import { useLayoutEffect, useMemo } from 'react';

import { connectionsActions } from '#/api/connection';
import { useToggle } from '#/client/shared/hooks';
import { Connection } from '#/domain/connection';
import { Message } from '#/domain/message';
import { store, useAppDispatch, useAppSelector } from '#/store';

export interface UseConnections {
  connections: Connection[];

  isLoading: boolean;
  isLoadingError: boolean;

  currentConnection?: Connection;
  setCurrentConnection(value?: Connection): void;
  addConnection(connection: Connection): void;
  updateLastMessage(message: Message): void;
}

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

  // List connections on mount
  useLayoutEffect(() => {
    isLoading.setTrue();
    isLoadingError.setFalse();

    connectionsActions
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
    addConnection,
    updateLastMessage,
  };
}
