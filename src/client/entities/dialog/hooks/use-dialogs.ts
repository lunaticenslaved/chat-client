import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { Dialog } from '@common/models';
import { store, useAppDispatch, useAppSelector } from '@common/store';

import { api } from '@/shared/api';

export type UseDialogsRequest = {
  searchQuery?: string;
};

export type UseDialogsResponse = {
  dialogs: Dialog[];
  isFetching: boolean;
  isError: boolean;
  currentDialog?: Dialog;
  selectDialog(dialog?: Dialog): void;
};

export const useDialogs = ({ searchQuery }: UseDialogsRequest): UseDialogsResponse => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['dialog/list', searchQuery],
    queryFn: () =>
      api.actions.dialogs.list({
        data: { search: searchQuery },
      }),
  });
  const dialogs = data?.dialogs;

  const currentDialog = useAppSelector(store.dialog.selectors.selectCurrentDialog);
  const dispatch = useAppDispatch();

  const filtered = useMemo(() => {
    if (!dialogs) return [];
    if (!searchQuery) return dialogs;

    const s = searchQuery.toLowerCase();

    return dialogs.filter(d => d.partner.login.toLowerCase().includes(s));
  }, [dialogs, searchQuery]);

  const selectDialog = useCallback(
    (dialog: Dialog) => {
      dispatch(store.dialog.actions.setCurrentDialogId(dialog.id));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(store.dialog.actions.setDialogs(data?.dialogs || []));
  }, [data?.dialogs, dispatch]);

  return {
    dialogs: filtered,
    isFetching,
    isError,
    currentDialog,
    selectDialog,
  };
};
