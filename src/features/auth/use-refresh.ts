import { useCallback } from "react";

import { useRefreshMutation } from "api/auth-api";
import { useAppDispatch } from "shared/hooks";

import { Handlers } from "./_lib";
import { viewerActions } from "features/viewer/store";

export const useRefresh = ({ onError, onSuccess }: Handlers = {}) => {
  const [makeRefresh, { isLoading }] = useRefreshMutation();
  const dispatch = useAppDispatch();

  const refresh = useCallback(async () => {
    if (!localStorage.getItem("token")) return;

    try {
      const viewer = await makeRefresh().unwrap();

      if (onSuccess) {
        dispatch(viewerActions.setViewer(viewer));

        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  }, []);

  return {
    refresh,
    isLoading,
  };
};
