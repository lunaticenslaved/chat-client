import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { useAppDispatch, useAppSelector } from '@/config/store';
import { DialogModel } from '@/entities/dialog';
import dayjs from '@/shared/lib/dayjs';

import { DialogsAPI } from '../api';
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
    queryKey: ['dialogs'],
    queryFn: DialogsAPI.getDialogs,
  });

  const currentDialog = useAppSelector(DialogsStore.selectors.selectCurrentDialog);
  const dispatch = useAppDispatch();

  const sorted = useMemo(() => {
    const lds = data?.dialogs || [];
    lds.sort((a, b) => {
      const at = dayjs(a.lastMessage.createdAt);
      const bt = dayjs(b.lastMessage.createdAt);

      if (!at && at) return -1;
      if (at && !at) return 1;
      if (!at && !at) return 0;

      if (at.isAfter(bt)) return -1;
      if (at.isBefore(bt)) return 1;

      return 0;
    });
    return lds;
  }, [data?.dialogs]);

  const filtered = useMemo(() => {
    if (!searchQuery) return sorted;

    const s = searchQuery.toLowerCase();

    return sorted.filter(d => d.user.name.toLowerCase().includes(s));
  }, [searchQuery, sorted]);

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
