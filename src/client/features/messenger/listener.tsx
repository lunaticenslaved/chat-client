import { PropsWithChildren, createContext, useEffect, useMemo } from 'react';

import { DialogEventsEmitter, DialogEventsListener } from '#/api/dialog';
import { MessageEventsEmitter, MessageEventsListener } from '#/api/message';
import { useDialog } from '#/client/entities/dialog';
import { useViewer } from '#/client/entities/viewer';
import { Token } from '#/client/shared/token';
import { isExistingDialog } from '#/domain/dialog';
import { store, useAppDispatch } from '#/store';

import { useSocketContext } from '../../shared/socket-context';

const MessagesContextBase = createContext({});

export function MessagesListener({ children }: PropsWithChildren) {
  const { socket } = useSocketContext();
  const dispatch = useAppDispatch();
  const viewer = useViewer();
  const { current: currentDialog } = useDialog();

  // emitters
  const messagesEmitter = useMemo(() => new MessageEventsEmitter(socket), [socket]);
  const dialogsEmitter = useMemo(() => new DialogEventsEmitter(socket), [socket]);

  // listeners
  const dialogsListener = useMemo(() => new DialogEventsListener(socket), [socket]);
  const messagesListener = useMemo(() => new MessageEventsListener(socket), [socket]);

  useEffect(() => {
    if (!viewer.isAuthorized) return;
    if (!Token.exists()) return;

    dialogsListener.dialogCreated(dialog => {
      dispatch(store.dialogs.actions.setSearch(''));
      dispatch(store.dialogs.actions.setDialogs([dialog]));
    });

    messagesListener.messageCreated(data => {
      console.log('MESSAGE CREATED', data);
    });
  }, [dialogsListener, dispatch, messagesListener, socket, viewer.isAuthorized]);

  useEffect(() => {
    if (!viewer.isAuthorized) return;
    if (!Token.exists()) return;

    dialogsEmitter.listDialogs({ take: 20 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!viewer.isAuthorized) return;
    if (!currentDialog) return;
    if (!Token.exists()) return;

    if (isExistingDialog(currentDialog)) {
      messagesEmitter.listMessages({ take: 20, dialogId: currentDialog.id });
    }
  }, [currentDialog, messagesEmitter, viewer.isAuthorized]);

  return <MessagesContextBase.Provider value={{}}>{children}</MessagesContextBase.Provider>;
}
