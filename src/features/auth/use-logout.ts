import { useCallback } from "react";

import { useAppDispatch } from "@/config/store";
import { useLogoutMutation } from "@/entities/viewer/api";
import { ViewerStore } from "@/entities/viewer";

import { Handlers } from "./_lib";

export const useLogout = ({ onError, onSuccess }: Handlers = {}) => {
  const [makeLogout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const logout = useCallback(async () => {
    try {
      await makeLogout().unwrap();

      if (onSuccess) {
        dispatch(ViewerStore.actions.setViewer(null));

        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  }, [dispatch, makeLogout, onError, onSuccess]);

  return {
    logout,
    isLoading,
  };
};
