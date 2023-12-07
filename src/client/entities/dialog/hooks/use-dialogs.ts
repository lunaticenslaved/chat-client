import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { Dialog } from '@common/models';
import { store, useAppDispatch } from '@common/store';

import { api } from '@/shared/api';

export type UseDialogsRequest = {
  disabled?: boolean;
};

export type UseDialogsResponse = {
  dialogs: Dialog[];
  isLoading: boolean;
  isError: boolean;
};

export const useDialogs = ({ disabled }: UseDialogsRequest = {}): UseDialogsResponse => {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useQuery(
    ['dialog/list'],
    () => api.actions.dialogs.list({ data: undefined }),
    {
      enabled: !disabled,
    },
  );

  const dialogs = data?.dialogs;

  useEffect(() => {
    dispatch(store.dialog.actions.setDialogs(dialogs || []));
  }, [dialogs, dispatch]);

  return useMemo(
    () => ({
      dialogs: dialogs || [],
      isLoading,
      isError,
    }),
    [dialogs, isError, isLoading],
  );
};
