import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { DialogEventsListener } from '#/api/dialog';
import { api } from '#/client/shared/api';
import { useToggle } from '#/client/shared/hooks';
import { useSocketContext } from '#/client/shared/socket-context';
import { Dialog, isExistingDialog } from '#/domain/dialog';

export interface IDialogsContext {
  dialogs: Dialog[];
  currentDialog?: Dialog;
  isLoadingDialogs: boolean;
  isErrorWhileLoadingDialogs: boolean;

  setCurrentDialog(dialog: Dialog): void;
}

export type DialogsContextProps = {
  children?: ReactNode | ((value: IDialogsContext) => ReactNode | JSX.Element);
};

const Context = createContext<IDialogsContext | undefined>(undefined);

function Provider({ children }: DialogsContextProps) {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);
  const [currentDialog, setCurrentDialog] = useState<Dialog>();
  const loadingDialogsToggle = useToggle();
  const errorDialogsToggle = useToggle();

  const { socket } = useSocketContext();
  const dialogsListener = useMemo(() => new DialogEventsListener(socket), [socket]);

  const value: IDialogsContext = useMemo(
    () => ({
      dialogs,
      currentDialog,
      isLoadingDialogs: false,
      isErrorWhileLoadingDialogs: false,

      setCurrentDialog,
    }),
    [dialogs, currentDialog],
  );

  useEffect(() => {
    // FIXME handle error
    dialogsListener.dialogCreated(({ data }) => {
      if (data) {
        console.log('DIALOG CREATED', data);

        setDialogs([data, ...dialogs]);
      }
    });

    // FIXME handle error
    dialogsListener.dialogUpdated(({ data }) => {
      if (data) {
        console.log('DIALOG UPDATED', data);

        setDialogs(arr => {
          const index = arr.findIndex(dialog => {
            // FIXME use ALWAYS get from server existing dialog
            return isExistingDialog(dialog) && isExistingDialog(data) && dialog.id === data.id;
          });

          if (index < 0) return arr;

          return arr.map((dialog, idx) => {
            if (index === idx) {
              return data;
            }

            return dialog;
          });
        });
      }
    });
  }, [dialogs, dialogsListener]);

  useEffect(() => {
    console.log('LIST DIALOGS');

    loadingDialogsToggle.setTrue();
    errorDialogsToggle.setFalse();

    api.actions.dialog
      .list({ data: undefined })
      .then(data => {
        setDialogs(data.dialogs);
      })
      .catch(() => {
        errorDialogsToggle.setTrue();
      })
      .finally(() => {
        loadingDialogsToggle.setFalse();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  );
}

export function DialogsContext(props: DialogsContextProps) {
  const existingContext = useContext(Context);

  if (existingContext) {
    const { children } = props;

    return typeof children === 'function' ? children(existingContext) : children;
  }

  return <Provider {...props} />;
}

export function useDialogsContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('No dialog context!');
  }

  return context;
}
