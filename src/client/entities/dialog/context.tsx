import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ConnectionEventsListener } from '#/api/connection';
import { api } from '#/client/shared/api';
import { useToggle } from '#/client/shared/hooks';
import { useSocketContext } from '#/client/shared/socket-context';
import { Connection } from '#/domain/connection';
import { User } from '#/domain/user';

type SelectedItem =
  | {
      type: 'dialog';
      dialog: Connection;
    }
  | {
      type: 'user';
      user: User;
    };

export interface IDialogsContext {
  dialogs: Connection[];
  selectedItem?: SelectedItem;
  isLoadingDialogs: boolean;
  isErrorWhileLoadingDialogs: boolean;

  setSelectedUser(user: User): void;
  setSelectedDialog(dialog: Connection): void;
}

export type DialogsContextProps = {
  children?: ReactNode | ((value: IDialogsContext) => ReactNode | JSX.Element);
};

const Context = createContext<IDialogsContext | undefined>(undefined);

function Provider({ children }: DialogsContextProps) {
  const [dialogs, setDialogs] = useState<Connection[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();
  const loadingDialogsToggle = useToggle();
  const errorDialogsToggle = useToggle();

  const { socket } = useSocketContext();
  const connectionsListener = useMemo(() => new ConnectionEventsListener(socket), [socket]);

  const setSelectedDialog = useCallback((value: Connection) => {
    setSelectedItem({ dialog: value, type: 'dialog' });
  }, []);

  const setSelectedUser = useCallback((value: User) => {
    setSelectedItem({ user: value, type: 'user' });
  }, []);

  const value: IDialogsContext = useMemo(
    () => ({
      dialogs,
      isLoadingDialogs: false,
      isErrorWhileLoadingDialogs: false,

      selectedItem,

      setSelectedUser,
      setSelectedDialog,
    }),
    [dialogs, selectedItem, setSelectedDialog, setSelectedUser],
  );

  useEffect(() => {
    // FIXME handle error
    connectionsListener.connectionCreated(data => {
      console.log('CONNECTION CREATED', data);

      setDialogs([data, ...dialogs]);
    });

    // FIXME handle error
    connectionsListener.connectionUpdated(data => {
      console.log('DIALOG UPDATED', data);

      setDialogs(arr => {
        const index = arr.findIndex(dialog => dialog.id === data.id);

        if (index < 0) return arr;

        return arr.map((dialog, idx) => {
          if (index === idx) {
            return data;
          }

          return dialog;
        });
      });
    });
  }, [connectionsListener, dialogs]);

  useEffect(() => {
    console.log('LIST DIALOGS');

    loadingDialogsToggle.setTrue();
    errorDialogsToggle.setFalse();

    api.actions.dialog
      .list({ data: undefined })
      .then(data => {
        setDialogs(data.connections);
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
