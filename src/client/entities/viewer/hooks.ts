import { useCallback, useEffect, useMemo } from 'react';
import { useMutation } from 'react-query';

import { useAppDispatch, useAppSelector } from '@/config/store';
import { ViewerAPI } from '@/entities/viewer/api';

import { ViewerStore } from './store';
import { ViewerModel } from './types';

export interface UseViewerResponseRequest {
  fetch?: boolean;
}

export interface UseViewerResponse {
  user?: ViewerModel;
  isAuthorized: boolean;
  isActivated: boolean;
  isFetching: boolean;
  fetch(): void;
  set(user?: ViewerModel): void;
}

export function useViewer(props?: UseViewerResponseRequest): UseViewerResponse {
  const user = useAppSelector(ViewerStore.selectors.selectViewer);
  const isAuthorized = useMemo(() => !!user, [user]);
  const isActivated = useMemo(() => !!user?.isActivated, [user?.isActivated]);
  const dispatch = useAppDispatch();

  const getViewerMutation = useMutation({
    mutationKey: 'viewer/get',
    mutationFn: ViewerAPI.get,
  });

  const set = useCallback(
    (viewer?: ViewerModel) => {
      dispatch(ViewerStore.actions.setViewer(viewer));
    },
    [dispatch],
  );

  const fetch = useCallback(async () => {
    const { user } = await getViewerMutation.mutateAsync();
    set(user);
  }, [getViewerMutation, set]);

  useEffect(() => {
    if (props?.fetch) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      user: user || undefined,
      set,
      isActivated,
      isAuthorized,
      fetch,
      isFetching: getViewerMutation.isLoading,
    }),
    [fetch, getViewerMutation.isLoading, isActivated, isAuthorized, set, user],
  );
}
