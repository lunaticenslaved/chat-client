import { useCallback } from 'react';

import { Dialog } from '@common/models';
import { store, useAppDispatch, useAppSelector } from '@common/store';

export type UseCurrentDialogResponse = {
  current?: Dialog;
  set(dialog?: Dialog): void;
};

export const useCurrentDialog = (): UseCurrentDialogResponse => {
  const dispatch = useAppDispatch();
  const currentDialog = useAppSelector(store.dialog.selectors.selectCurrentDialog);

  const setCurrentDialog = useCallback(
    (dialog?: Dialog) => {
      dispatch(store.dialog.actions.setCurrentDialogId(dialog?.id));
    },
    [dispatch],
  );

  return {
    current: currentDialog,
    set: setCurrentDialog,
  };
};
