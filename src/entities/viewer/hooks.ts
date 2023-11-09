import { useCallback, useEffect, useMemo } from "react";
import { useMutation } from "react-query";

import { useAppDispatch, useAppSelector } from "@/config/store";
import { ViewerAPI } from "@/entities/viewer/api";
import { Handlers } from "@/shared/types";

import { ViewerModel } from "./types";
import { ViewerStore } from "./store";

export type UseViewerRequest = {
  onRefreshSuccess: Handlers["onSuccess"];
  onRefreshError: Handlers["onError"];
};

export type UseViewerResponse = {
  viewer?: ViewerModel;
  isAuthorized: boolean;
  isActivated: boolean;
  setViewer(viewer?: ViewerModel): void;
  refresh(): void;
  isRefreshing: boolean;
};

export function useViewer(data?: UseViewerRequest): UseViewerResponse {
  const { onRefreshSuccess, onRefreshError } = data || {};

  const viewer = useAppSelector(ViewerStore.selectors.selectViewer);
  const isAuthorized = useMemo(() => !!viewer, [viewer]);
  const isActivated = useMemo(() => !!viewer?.isActivated, [viewer?.isActivated]);
  const dispatch = useAppDispatch();

  const refreshMutation = useMutation({
    mutationKey: "refresh",
    mutationFn: ViewerAPI.refresh,
  });

  const setViewer = useCallback(
    (viewer?: ViewerModel) => {
      dispatch(ViewerStore.actions.setViewer(viewer));
    },
    [dispatch]
  );

  useEffect(() => {
    setViewer(refreshMutation.data?.user);

    if (refreshMutation.error) {
      onRefreshError?.(refreshMutation.error as Error);
    } else {
      onRefreshSuccess?.();
    }
  }, [
    onRefreshError,
    onRefreshSuccess,
    refreshMutation.data?.user,
    refreshMutation.error,
    setViewer,
  ]);

  return useMemo(
    () => ({
      viewer: viewer || undefined,
      setViewer,
      isActivated,
      isAuthorized,
      refresh: refreshMutation.mutate,
      isRefreshing: refreshMutation.isLoading,
    }),
    [
      isActivated,
      isAuthorized,
      refreshMutation.isLoading,
      refreshMutation.mutate,
      setViewer,
      viewer,
    ]
  );
}
