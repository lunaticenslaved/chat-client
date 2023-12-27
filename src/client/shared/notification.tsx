import { PropsWithChildren, createContext, useContext, useMemo } from 'react';

import { message } from 'antd';

export interface INotification {
  showError(text: string): void;
  showSuccess(text: string): void;
}

const Context = createContext<INotification | undefined>(undefined);

export function NotificationContextProvider({ children }: PropsWithChildren) {
  const value: INotification = useMemo(
    () => ({
      showError(text) {
        message.error(text);
      },
      showSuccess(text) {
        message.success(text);
      },
    }),
    [],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useNotification() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Notification context not found');
  }

  return context;
}
