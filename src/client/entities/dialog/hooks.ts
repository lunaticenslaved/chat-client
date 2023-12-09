import { useCallback, useMemo } from 'react';

import { Dialog } from '#/domain/dialog';
import { store, useAppDispatch, useAppSelector } from '#/store';

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
      dispatch(store.dialogs.actions.setCurrentDialog(value));
    },
    [dispatch],
  );
  const clear = useCallback(() => {
    dispatch(store.dialogs.actions.setCurrentDialog(undefined));
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
