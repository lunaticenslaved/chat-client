import { useLayoutEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { connectionsActions } from '#/api/connection';
import { useToggle } from '#/client/shared/hooks';
import { Connection } from '#/domain/connection';

import { SelectedItem } from '../types';

export type IConnectionInfo =
  | {
      state: 'loading';
      isOpen: boolean;
      isLoadingConnection: true;
      open(): void;
      close(): void;
      toggle(): void;
    }
  | {
      state: 'loaded';
      connection: Connection;
      isLoadingConnection: false;
      isOpen: boolean;
      open(): void;
      close(): void;
      toggle(): void;
    };

export function useConnectionInfo(selectedItem?: SelectedItem): IConnectionInfo {
  const connectionId = selectedItem?.type === 'connection' ? selectedItem.connection.id : undefined;
  const isOpen = useToggle();
  const { data: connection, isLoading } = useQuery(
    ['connection/get', connectionId],
    () => (connectionId ? connectionsActions.get({ data: { connectionId } }) : undefined),
    { enabled: !!connectionId },
  );

  useLayoutEffect(() => {
    if (!connection) isOpen.setFalse();
  }, [isOpen, connection]);

  return useMemo((): IConnectionInfo => {
    const common = {
      isOpen: isOpen.value,
      open: isOpen.setTrue,
      close: isOpen.setFalse,
      toggle: isOpen.toggle,
    };

    if (isLoading || !connection) {
      return {
        ...common,
        state: 'loading',
        isLoadingConnection: true,
      };
    } else {
      return {
        ...common,
        state: 'loaded',
        connection,
        isLoadingConnection: false,
      };
    }
  }, [connection, isLoading, isOpen.setFalse, isOpen.setTrue, isOpen.toggle, isOpen.value]);
}
