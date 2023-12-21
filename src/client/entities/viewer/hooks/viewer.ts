import { useCallback, useEffect, useMemo } from 'react';
import { useMutation } from 'react-query';

import { viewerActions } from '#/api/viewer';
import { Viewer } from '#/domain/viewer';
import { store, useAppDispatch, useAppSelector } from '#/store';

export interface UseViewerResponseRequest {
  fetch?: boolean;
}

export interface UseViewerResponse {
  user?: Viewer;
  isAuthorized: boolean;
  isActivated: boolean;
  isFetching: boolean;
  fetch(): void;
  set(user?: Viewer): void;
}

export function useViewer(props?: UseViewerResponseRequest): UseViewerResponse {
  const user = useAppSelector(store.viewer.selectors.selectViewer);
  const isAuthorized = useMemo(() => !!user, [user]);
  const isActivated = useMemo(() => !!user?.isActivated, [user?.isActivated]);
  const dispatch = useAppDispatch();

  const getViewerMutation = useMutation({
    mutationKey: 'viewer/get',
    mutationFn: viewerActions.get,
  });

  const set = useCallback(
    (viewer?: Viewer) => {
      dispatch(store.viewer.actions.setViewer(viewer));
    },
    [dispatch],
  );

  const fetch = useCallback(async () => {
    const { user } = await getViewerMutation.mutateAsync({ data: undefined });
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
