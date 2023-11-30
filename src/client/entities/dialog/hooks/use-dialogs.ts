import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { useAppDispatch, useAppSelector } from '@/config/store';
import { DialogModel } from '@/entities/dialog';

import { DialogActions } from '../actions';
import { DialogsStore } from '../store';

export type UseDialogsRequest = {
  searchQuery?: string;
};

export type UseDialogsResponse = {
  dialogs: DialogModel[];
  isFetching: boolean;
  isError: boolean;
  currentDialog?: DialogModel;
  selectDialog(dialog?: DialogModel): void;
};

export const useDialogs = ({ searchQuery }: UseDialogsRequest): UseDialogsResponse => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['dialog/list', searchQuery],
    queryFn: () => DialogActions.list({ search: searchQuery }),
  });

  const dialogs = data?.dialogs;

  const currentDialog = useAppSelector(DialogsStore.selectors.selectCurrentDialog);
  const dispatch = useAppDispatch();

  const filtered = useMemo(() => {
    if (!dialogs) return [];
    if (!searchQuery) return dialogs;

    const s = searchQuery.toLowerCase();

    return dialogs.filter(d => d.partner.login.toLowerCase().includes(s));
  }, [dialogs, searchQuery]);

  const selectDialog = useCallback(
    (dialog: DialogModel) => {
      dispatch(DialogsStore.actions.setCurrentDialogId(dialog.id));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(DialogsStore.actions.setDialogs(data?.dialogs || []));
  }, [data?.dialogs, dispatch]);

  return {
    dialogs: filtered,
    isFetching,
    isError,
    currentDialog,
    selectDialog,
  };
};
