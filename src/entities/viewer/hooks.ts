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
  viewer?: ViewerModel;
  isAuthorized: boolean;
  isActivated: boolean;
  isFetching: boolean;
  fetch(): void;
  setViewer(viewer?: ViewerModel): void;
}

export function useViewer(props?: UseViewerResponseRequest): UseViewerResponse {
  const viewer = useAppSelector(ViewerStore.selectors.selectViewer);
  const isAuthorized = useMemo(() => !!viewer, [viewer]);
  const isActivated = useMemo(() => !!viewer?.isActivated, [viewer?.isActivated]);
  const dispatch = useAppDispatch();

  const getViewerMutation = useMutation({
    mutationKey: 'viewer/get',
    mutationFn: ViewerAPI.get,
  });

  const setViewer = useCallback(
    (viewer?: ViewerModel) => {
      dispatch(ViewerStore.actions.setViewer(viewer));
    },
    [dispatch],
  );

  const fetch = useCallback(async () => {
    const { user } = await getViewerMutation.mutateAsync();
    setViewer(user);
  }, [getViewerMutation, setViewer]);

  useEffect(() => {
    if (props?.fetch) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      viewer: viewer || undefined,
      setViewer,
      isActivated,
      isAuthorized,
      fetch,
      isFetching: getViewerMutation.isLoading,
    }),
    [fetch, getViewerMutation.isLoading, isActivated, isAuthorized, setViewer, viewer],
  );
}
