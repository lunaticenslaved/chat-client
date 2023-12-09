import { PropsWithChildren, createContext, useEffect, useMemo } from 'react';

import { DialogEventsEmitter, DialogEventsListener } from '#/api/dialog';
import { useViewer } from '#/client/entities/viewer';
import { Token } from '#/client/shared/token';
import { store, useAppDispatch } from '#/store';

import { useSocketContext } from '../../shared/socket-context';

const MessagesContextBase = createContext({});

export function MessagesListener({ children }: PropsWithChildren) {
  const { socket } = useSocketContext();
  const dispatch = useAppDispatch();
  const viewer = useViewer();

  // emitters
  const dialogsEmitter = useMemo(() => new DialogEventsEmitter(socket), [socket]);

  // listeners
  const dialogsListener = useMemo(() => new DialogEventsListener(socket), [socket]);

  useEffect(() => {
    if (!viewer.isAuthorized) return;
    if (!Token.exists()) return;

    dialogsListener.dialogCreated(dialog => {
      dispatch(store.dialogs.actions.setSearch(''));
      dispatch(store.dialogs.actions.setDialogs([dialog]));
    });
    dialogsListener.listDialogs(({ data }) => {
      console.log('LIST DIALOGS RESPONSE', data);
      dispatch(store.dialogs.actions.setDialogs(data || []));
    });
  }, [dialogsListener, dispatch, socket, viewer.isAuthorized]);

  useEffect(() => {
    if (!viewer.isAuthorized) return;
    if (!Token.exists()) return;

    dialogsEmitter.listDialogs({ take: 20 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MessagesContextBase.Provider value={{}}>{children}</MessagesContextBase.Provider>;
}
