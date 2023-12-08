import { useCallback, useMemo } from 'react';

import { Dialog } from '@common/models';
import { store, useAppDispatch, useAppSelector } from '@common/store';

export interface UseDialogResponse {
  current?: Dialog;
  set(value: Dialog): void;
  clear(): void;
}

export function useDialog(): UseDialogResponse {
  const currentDialog = useAppSelector(store.dialogs.selectors.selectCurrentDialog);
  const dispatch = useAppDispatch();

  const set = useCallback(
    (value: Dialog) => {
      dispatch(store.dialogs.actions.setCurrentDialogId(value));
    },
    [dispatch],
  );
  const clear = useCallback(() => {
    dispatch(store.dialogs.actions.setCurrentDialogId(undefined));
  }, [dispatch]);

  return useMemo(
    () => ({
      current: currentDialog,
      set,
      clear,
    }),
    [clear, currentDialog, set],
  );
}
