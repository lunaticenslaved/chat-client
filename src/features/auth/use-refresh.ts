import { useCallback } from "react";

import { useAppDispatch } from "@/config/store";
import { ViewerStore } from "@/entities/viewer";
import { useRefreshMutation } from "@/entities/viewer/api";

import { Handlers } from "./_lib";

export const useRefresh = ({ onError, onSuccess }: Handlers = {}) => {
  const [makeRefresh, { isLoading }] = useRefreshMutation();
  const dispatch = useAppDispatch();

  const refresh = useCallback(async () => {
    try {
      const viewer = await makeRefresh().unwrap();

      if (onSuccess) {
        dispatch(ViewerStore.actions.setViewer(viewer));

        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  }, [dispatch, makeRefresh, onError, onSuccess]);

  return {
    refresh,
    isLoading,
  };
};
